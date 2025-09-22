from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import jwt # type: ignore
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)  # Habilita CORS para o frontend
app.config['SECRET_KEY'] = 'qualquer_chave' # Pode trocar para outra chave segura

# Carrega os dados dos CSVs com pandas
users_dataframe = pd.read_csv('data/users.csv')
metrics_dataframe = pd.read_csv('data/metrics.csv')

# Função para verificar token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token de acesso é necessário!'}), 401
        
        try:
            # Remove o 'Bearer ' do token se presente
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data['username']
            current_role = data['role']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401
        
        return f(current_user, current_role, *args, **kwargs)
    
    return decorated

# Endpoint de Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = str(data.get('email'))
    password = str(data.get('password'))

    user = users_dataframe[(users_dataframe['email'] == email) & (users_dataframe['password'] == password)]
    if not user.empty:
        role = user.iloc[0]['role']
        username = user.iloc[0]['username']

        # Criar token JWT
        token = jwt.encode({
            'username': username,
            'role': role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({
            'message': 'Login successful',
            'role': role,
            'username': username,
            'token': token
        }), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Endpoint para dados (com filtros, ordenação e paginação)
@app.route('/metrics', methods=['GET'])
@token_required
def get_metrics(current_user, current_role):
    # Parâmetros da URL para filtro, ordenação, role e paginação
    date_filter = request.args.get('date')
    sort_by = request.args.get('sort_by')
    sort_order = request.args.get('sort_order', 'asc')
    # Parâmetros de paginação
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 100))

    filtered_dataframe = metrics_dataframe.copy()

    # Filtrar por data
    if date_filter:
        filtered_dataframe = filtered_dataframe[filtered_dataframe['date'] == date_filter]

    # Ordenar por coluna
    if sort_by and sort_by in filtered_dataframe.columns:
        ascending = (sort_order.lower() == 'asc')
        filtered_dataframe = filtered_dataframe.sort_values(by=sort_by, ascending=ascending)

    # Ocultar a coluna 'cost_micros' para usuários que não são 'admin'
    if current_role != 'admin':
        filtered_dataframe = filtered_dataframe.drop(columns=['cost_micros'], errors='ignore')

    # Aplicar paginação
    total = len(filtered_dataframe)
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    paginated_dataframe = filtered_dataframe.iloc[start_idx:end_idx]

    # Converte o DataFrame para um dicionário JSON e retorna com informações de paginação
    return jsonify({
        'data': paginated_dataframe.to_dict('records'),
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': (total + per_page - 1) // per_page
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
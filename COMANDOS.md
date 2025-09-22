# Comandos usados para criar o backend e frontend

## Configuração do Ambiente Backend
### Comandos dentro da pasta /backend
- cd backend
- python -m venv venv
- No Windows:                   No linux: 
    - venv\Scripts\activate         - source venv/bin/activate    
- pip install Flask pandas Flask-CORS pyjwt flask-httpauth
- pip freeze > requirements.txt
- pip install -r requirements.txt
- python app.py (para rodar)

Flask: O framework web.

pandas: Essencial para ler e manipular os dados dos arquivos CSV de forma eficiente.

Flask-CORS: Necessário para permitir que o frontend (em um domínio diferente) acesse a API.

## Configuração do Ambiente Frontend
### Comandos dentro da pasta /frontend
- cd frontend
- npm create vite@latest
- npm install axios react-router-dom
- npm install
- npm run dev (para rodar)

axios: para acessar o backend.

router: Para criar rotas.

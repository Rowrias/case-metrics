import { Link } from 'react-router-dom';
import './styles.css';

function HomeContent({ user }) {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Métricas</h1>

      <div>
        {user ? (
          <div>
            <p>Você já está logado como: ({user.username})</p>
            <Link to="/dashboard">
              Ir para Dashboard
            </Link>
          </div>
        ) : (
          <div>
            <p>Faça login para acessar o dashboard</p>
            <Link to="/login">
              Fazer Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;

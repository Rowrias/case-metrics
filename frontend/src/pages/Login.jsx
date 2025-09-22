import { useNavigate } from 'react-router-dom';
import LoginContent from '../components/LoginContent';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    // Chamar a função onLogin passada pelo App.jsx
    if (onLogin) {
      onLogin(userData);
    }
    
    // Redirecionar para o dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <LoginContent onLogin={handleLogin} />
    </div>
  );
};

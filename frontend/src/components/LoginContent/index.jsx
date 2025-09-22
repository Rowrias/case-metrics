import { useState } from 'react';
import axios from 'axios';
import './styles.css';

function LoginContent({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      // Armazenar o token no localStorage
      localStorage.setItem('authToken', response.data.token);

      onLogin({
        username: response.data.username,
        role: response.data.role,
        token: response.data.token
      });

    } catch (erro) {
      console.error('Login error:', erro.response?.data || erro.message);
      setError('Credenciais inválidas. Tente novamente.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit} className='form'>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

    </div>
  );
};

export default LoginContent;

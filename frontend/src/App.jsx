import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há um token válido ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decodificar o token para obter informações do usuário
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          username: payload.username,
          role: payload.role,
          token: token
        });
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);

  }, []);
  
  const handleLogin = (userData) => {
    localStorage.setItem('authToken', userData.token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>

          <Route 
            path="/" 
            element={<Home user={user} />} 
          />

          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
          />

          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

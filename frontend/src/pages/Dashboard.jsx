import { useNavigate } from 'react-router-dom';
import DashboardContent from '../components/DashboardContent';

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <DashboardContent 
        user={user} 
        onLogout={onLogout} 
        onSessionExpired={handleSessionExpired} 
      />
    </div>
  );
}
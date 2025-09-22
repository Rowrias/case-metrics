import './styles.css';

function LoginHeader({ user, onLogout, title = "Login" }) {
  return (
    <div className="header">
      <h2>{title}</h2>

      <div className="header-info">
        <p>
          Usuário: ({user.username}), Acesso: ({user.role})
        </p>
        <button onClick={onLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default LoginHeader;

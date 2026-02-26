import "./Header.css";

export default function Header({
  title = "Senai",
  showLogin = true,
  onLogin,
}) {
  return (
    <header className="header">
      <h1>{title}</h1>

      {showLogin && (
        <button onClick={onLogin}>
          Login
        </button>
      )}
    </header>
  );
}
import PropTypes from "prop-types";
import "./Header.css";

export function Header({
  variant = "default",
  logo,
  navLinks = [],
  onLogin,
  onLogout,
  onSignup,
  isLoggedIn = false,
  sticky = false,
}) {
  return (
    <header
      className={[
        "header",
        `header--${variant}`,
        sticky ? "header--sticky" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Área do Logo / Título */}
      <div className="header__logo">
        {typeof logo === "string" ? (
          <span className="header__logo-text">{logo}</span>
        ) : (
          logo
        )}
      </div>

      {/* Navegação */}
      {navLinks.length > 0 && (
        <nav className="header__nav" aria-label="Navegação principal">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.label} className="header__nav-item">
                <a
                  href={link.href}
                  className={`header__nav-link ${link.active ? "header__nav-link--active" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Área de ações (login / logout / signup) */}
      <div className="header__actions">
        {isLoggedIn ? (
          <button
            className="header__btn header__btn--outline"
            onClick={onLogout}
            type="button"
          >
            Sair
          </button>
        ) : (
          <>
            <button
              className="header__btn header__btn--ghost"
              onClick={onLogin}
              type="button"
            >
              Entrar
            </button>
            <button
              className="header__btn header__btn--primary"
              onClick={onSignup}
              type="button"
            >
              Cadastrar
            </button>
          </>
        )}
      </div>
    </header>
  );
}

// ─── Definição de PropTypes ───────────────────────────────────────────────────
// PropTypes documentam quais props o componente aceita, seus tipos e se são
// obrigatórias. O Storybook lê essas informações para gerar a tabela "Controls"
// automaticamente no painel de documentação.

Header.propTypes = {
  /** Tema visual do header */
  variant: PropTypes.oneOf(["default", "dark", "transparent", "colored"]),

  /** Logotipo: pode ser uma string (texto) ou um elemento JSX (ex: <img />) */
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Lista de links de navegação.
   * Cada item deve ter { label, href, active? }
   */
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ),

  /** Callback disparado ao clicar em "Entrar" */
  onLogin: PropTypes.func,

  /** Callback disparado ao clicar em "Sair" */
  onLogout: PropTypes.func,

  /** Callback disparado ao clicar em "Cadastrar" */
  onSignup: PropTypes.func,

  /** Se verdadeiro, exibe botão "Sair" em vez de "Entrar / Cadastrar" */
  isLoggedIn: PropTypes.bool,

  /** Fixa o header no topo da tela com position: sticky */
  sticky: PropTypes.bool,
};

export default Header;
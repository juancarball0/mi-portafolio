import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LINKS = [
  { to: '/',         label: 'inicio',    end: true },
  { to: '/about',    label: 'sobre mí',  end: false },
  { to: '/projects', label: 'proyectos', end: false },
  { to: '/contact',  label: 'contacto',  end: false },
];

/**
 * Navbar — barra de navegación sticky con links, toggle de tema y menú mobile.
 */
const Navbar = ({ tema, toggleTema }) => {
  // useState para controlar el menú hamburguesa en mobile
  const [menuAbierto, setMenuAbierto] = useState(false);

  const iconTema  = tema === 'dark' ? '☀' : '☾';
  const labelTema = tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <div className="d-flex align-items-center justify-content-between py-3">
          {/* Marca / Logo */}
          <Link to="/" className="nav-brand" onClick={cerrarMenu}>
            JFC<span>.</span>
          </Link>

          {/* Links de navegación — desktop */}
          <div className="d-none d-md-flex align-items-center gap-1">
            {LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Controles derecha */}
          <div className="d-flex align-items-center gap-2">
            {/* Toggle de tema — visible siempre */}
            <button
              className="btn-tema"
              onClick={toggleTema}
              aria-label={labelTema}
              title={labelTema}
            >
              {iconTema}
            </button>

            {/* Hamburguesa — solo mobile */}
            <button
              className="btn-tema d-md-none"
              onClick={() => setMenuAbierto(prev => !prev)}
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuAbierto ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menú desplegable mobile — renderizado condicional */}
        {menuAbierto && (
          <div className="nav-mobile d-md-none">
            {LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                onClick={cerrarMenu}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  tema:        PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleTema:  PropTypes.func.isRequired,
};

export default Navbar;

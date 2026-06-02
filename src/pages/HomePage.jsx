import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SkillBadge from '../components/SkillBadge';
import proyectos from '../data/proyectos.json';

/* ─── Datos ─────────────────────────────────────── */
const SKILLS = [
  'React 18', 'Vite', 'JavaScript', 'Firebase',
  'Node.js', 'Python', 'OpenCV', 'Bootstrap 5',
  'Git', 'REST APIs', 'IoT / ESP32',
];

const STATS = [
  { numero: `${proyectos.length}+`, label: 'Proyectos' },
  { numero: '2023',                 label: 'Desde'     },
];

/* ─── Componente ─────────────────────────────────── */
const HomePage = ({ tema, toggleTema }) => {
  // useState: muestra/oculta descripción extra
  const [mostrarExtra, setMostrarExtra] = useState(false);

  return (
    <div className="hero">
      {/* Fondos decorativos */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      {/* Texto de fondo gigante */}
      <span className="hero-bg-text" aria-hidden="true">JFC</span>

      <div className="container position-relative">
        <div className="row align-items-center g-5">

          {/* ── Columna principal ── */}
          <div className="col-lg-7">
            <p className="hero-subtitle anim-0">
              Analista de Sistemas · Córdoba, Argentina
            </p>

            <h1 className="hero-title anim-1">
              Juan F.<br />
              <span className="accent">Carballo</span>
            </h1>

            <p className="hero-desc anim-2">
              Soy Juan Carballo, estudiante de Análisis de Sistemas en Córdoba.
              Me gusta transformar ideas en{' '}
              <strong>soluciones reales</strong>: desde aplicaciones web hasta
              automatizaciones y herramientas que resuelvan problemas concretos.
            </p>

            {/* Renderizado condicional con && */}
            {mostrarExtra && (
              <p className="hero-desc anim-0" style={{ marginTop: 0 }}>
                Me enfoco en entender el problema, ordenar la información y
                construir algo útil de verdad. Cursando la{' '}
                <em>Tecnicatura en Análisis de Sistemas</em> en la Institución Cervantes.
              </p>
            )}

            {/* onClick: toggle descripción */}
            <button
              className="btn-ghost anim-2"
              style={{ fontSize: '0.75rem', padding: '0.32rem 0.8rem', marginBottom: '1.5rem' }}
              onClick={() => setMostrarExtra(prev => !prev)}
            >
              {mostrarExtra ? '− ver menos' : '+ ver más'}
            </button>

            {/* CTAs */}
            <div className="d-flex gap-3 flex-wrap anim-3">
              <Link to="/contact" className="btn-accent">
                Contactame →
              </Link>
              <Link to="/projects" className="btn-ghost">
                Ver proyectos
              </Link>
              {/* onClick: toggle de tema desde el hero */}
              <button
                className="btn-tema"
                onClick={toggleTema}
                title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              >
                {tema === 'dark' ? '☀' : '☾'}
              </button>
            </div>
          </div>

          {/* ── Columna lateral ── */}
          <div className="col-lg-5">
            {/* Stats numéricos */}
            <div className="d-flex gap-4 mb-4 anim-2">
              {/* .map() con key sobre array de stats */}
              {STATS.map(({ numero, label }) => (
                <div key={label}>
                  <div className="stat-num">{numero}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Card de skills */}
            <div className="card-info anim-3">
              <span className="section-label">Stack principal</span>
              <div className="d-flex flex-wrap gap-2">
                {/* .map() con key sobre array de skills */}
                {SKILLS.map((skill) => (
                  <SkillBadge key={skill} nombre={skill} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  tema:       PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleTema: PropTypes.func.isRequired,
};

export default HomePage;

import { useState } from 'react';
import SkillBadge from '../components/SkillBadge';

/* ─── Datos ─────────────────────────────────────── */

const EDUCACION = [
  {
    id: 1,
    fecha: '2023 – Presente',
    titulo: 'Tecnicatura Superior en Análisis de Sistemas',
    lugar: 'Institución Cervantes · Córdoba',
    desc: 'Formación orientada al análisis, diseño y desarrollo de sistemas de información. Conocimientos en programación, bases de datos, gestión de proyectos, metodologías ágiles, relevamiento de requerimientos y desarrollo de soluciones tecnológicas.',
  },
  {
    id: 2,
    fecha: 'Finalizado',
    titulo: 'Técnico en Programación',
    lugar: 'Escuela secundaria técnica',
    desc: 'Formación técnica en programación, desarrollo web, lógica de programación, bases de datos y construcción de aplicaciones. Base inicial para el desarrollo de sistemas y soluciones digitales.',
  },
];

const HABILIDADES = {
  'Desarrollo Frontend':  ['React 18', 'Vite', 'JavaScript', 'HTML5', 'CSS', 'Bootstrap 5'],
  'Backend y Base de Datos': ['Firebase', 'Firestore', 'Firebase Auth', 'Firebase Storage', 'Node.js', 'APIs REST'],
  'Herramientas':         ['Git', 'GitHub', 'Figma', 'VS Code', 'Firebase Hosting'],
  'Análisis de Sistemas': ['Relevamiento de requerimientos', 'Modelado de procesos', 'Casos de uso', 'DER', 'Scrum / Kanban'],
  'Otras áreas':          ['Python', 'OpenCV', 'IoT / ESP32', 'Automatización', 'Análisis deportivo'],
};

const TABS = ['educacion', 'habilidades'];

/* ─── Componente ─────────────────────────────────── */
const AboutPage = () => {
  const [tabActiva, setTabActiva] = useState('educacion');

  return (
    <div className="container">

      {/* Header */}
      <div className="mb-5 anim-0">
        <span className="section-label">Sobre mí</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          Quién soy &<br />qué hago
        </h1>
        <div className="divider" />
        <p style={{ maxWidth: 640, color: 'var(--fg-muted)', fontSize: '1.02rem', lineHeight: 1.85 }}>
          Soy estudiante de <strong style={{ color: 'var(--fg)' }}>Análisis de Sistemas</strong> en la
          Institución Cervantes, Córdoba. Me interesa el desarrollo de software, el análisis de
          requerimientos, las bases de datos y la construcción de herramientas útiles de verdad.
        </p>
        <p style={{ maxWidth: 640, color: 'var(--fg-muted)', fontSize: '1.02rem', lineHeight: 1.85, marginTop: '0.75rem' }}>
          Trabajo principalmente con <strong style={{ color: 'var(--fg)' }}>React, Firebase, JavaScript, Node.js y Python</strong>,
          y me interesa seguir profundizando en sistemas, automatización y desarrollo web.
        </p>
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 flex-wrap mb-4 anim-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setTabActiva(tab)}
            className={tabActiva === tab ? 'btn-accent' : 'btn-ghost'}
            style={{ fontSize: '0.8rem', padding: '0.48rem 1.2rem', textTransform: 'capitalize' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenido dinámico según tab activa */}
      <div className="anim-2">

        {/* Educación */}
        {tabActiva === 'educacion' && (
          <div>
            {EDUCACION.map((item) => (
              <div key={item.id} className="timeline-item">
                <p className="tl-fecha">{item.fecha}</p>
                <p className="tl-titulo">{item.titulo}</p>
                <p className="tl-lugar">{item.lugar}</p>
                {item.desc && <p className="tl-desc">{item.desc}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Habilidades */}
        {tabActiva === 'habilidades' && (
          <div className="row g-3">
            {Object.entries(HABILIDADES).map(([categoria, skills]) => (
              <div key={categoria} className="col-md-6">
                <div className="card-info h-100">
                  <span className="section-label">{categoria}</span>
                  <div className="d-flex flex-wrap gap-2 mt-1">
                    {skills.map((skill) => (
                      <SkillBadge key={skill} nombre={skill} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AboutPage;

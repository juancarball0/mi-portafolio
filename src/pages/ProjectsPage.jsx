import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

// Import directo del JSON como fallback
import datosLocales from '../data/proyectos.json';

/**
 * ProjectsPage — carga proyectos desde JSON simulando un fetch real.
 * Demuestra: useState, useEffect, async/await, estados cargando/error, .map() con key.
 */
const ProjectsPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función async dentro del efecto (patrón correcto con useEffect)
    const cargarProyectos = async () => {
      try {
        // Delay artificial para mostrar el loading state (como si fuera una API real)
        await new Promise(resolve => setTimeout(resolve, 700));

        // En producción reemplazás esto por:
        // const resp = await fetch('https://api.ejemplo.com/proyectos');
        // if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        // const datos = await resp.json();

        setProyectos(datosLocales);
      } catch (err) {
        setError(err.message);
      } finally {
        // Se ejecuta siempre, con éxito o error
        setCargando(false);
      }
    };

    cargarProyectos();
  }, []); // Array vacío: solo se ejecuta al montar el componente

  /* ── Estado de carga ── */
  if (cargando) {
    return (
      <div className="container">
        <div className="loading-wrap">
          <div className="loading-dots">
            <span /><span /><span />
          </div>
          <span className="loading-label">Cargando proyectos...</span>
        </div>
      </div>
    );
  }

  /* ── Estado de error ── */
  if (error) {
    return (
      <div className="container">
        <div className="alert-danger mt-4">
          ⚠ Error al cargar proyectos: {error}
        </div>
      </div>
    );
  }

  /* ── Render principal ── */
  return (
    <div className="container">

      {/* Header */}
      <div className="mb-5 anim-0">
        <span className="section-label">Proyectos</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          Proyectos
        </h1>
        <div className="divider" />
        <p style={{ color: 'var(--fg-muted)', maxWidth: 500 }}>
          {proyectos.length > 0
            ? `Algunos de los proyectos en los que trabajé.`
            : 'No hay proyectos disponibles todavía.'}
        </p>
      </div>

      {/* Grid de proyectos — .map() con key */}
      <div className="row g-4 anim-1">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="col-md-6 col-lg-4">
            <ProjectCard proyecto={proyecto} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProjectsPage;

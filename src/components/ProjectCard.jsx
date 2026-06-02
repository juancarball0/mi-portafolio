import PropTypes from 'prop-types';

/**
 * ProjectCard — tarjeta de proyecto con imagen, descripción, tags y links.
 */
const ProjectCard = ({ proyecto }) => {
  const { nombre, descripcion, tecnologias, imagen, linkDemo, linkRepo } = proyecto;

  return (
    <div className="project-card">
      {/* Imagen o placeholder con iniciales */}
      {imagen ? (
        <img
          src={imagen}
          alt={`Captura de ${nombre}`}
          className="project-thumb"
        />
      ) : (
        <div className="project-thumb-placeholder" aria-hidden="true">
          {nombre.slice(0, 2).toUpperCase()}
        </div>
      )}

      <div className="project-body">
        <h3 className="project-title">{nombre}</h3>
        <p className="project-desc">{descripcion}</p>

        {/* Tecnologías usando .map() con key */}
        {tecnologias?.length > 0 && (
          <div className="project-tags">
            {tecnologias.map((tech, i) => (
              <span key={i} className="project-tag">{tech}</span>
            ))}
          </div>
        )}

        {/* Links — renderizado condicional */}
        {(linkDemo || linkRepo) && (
          <div className="project-links">
            {linkDemo && (
              <a
                href={linkDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
                style={{ fontSize: '0.75rem', padding: '0.38rem 0.85rem' }}
              >
                Demo
              </a>
            )}
            {linkRepo && (
              <a
                href={linkRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: '0.75rem', padding: '0.38rem 0.85rem' }}
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  proyecto: PropTypes.shape({
    id:           PropTypes.number.isRequired,
    nombre:       PropTypes.string.isRequired,
    descripcion:  PropTypes.string.isRequired,
    tecnologias:  PropTypes.arrayOf(PropTypes.string).isRequired,
    imagen:       PropTypes.string,
    linkDemo:     PropTypes.string,
    linkRepo:     PropTypes.string,
  }).isRequired,
};

export default ProjectCard;

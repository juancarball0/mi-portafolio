import PropTypes from 'prop-types';

/**
 * SkillBadge — muestra una habilidad técnica como badge monoespaciado.
 */
const SkillBadge = ({ nombre, nivel }) => {
  return (
    <span
      className="skill-badge"
      title={nivel ? `Nivel: ${nivel}` : nombre}
    >
      {nombre}
    </span>
  );
};

SkillBadge.propTypes = {
  nombre: PropTypes.string.isRequired,
  nivel:  PropTypes.string,
};

SkillBadge.defaultProps = {
  nivel: '',
};

export default SkillBadge;

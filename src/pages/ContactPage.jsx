import { useReducer, useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════
   ESTADO INICIAL DEL FORMULARIO
   ═══════════════════════════════════════════════ */
const estadoInicial = {
  campos: {
    nombre:  '',
    email:   '',
    mensaje: '',
  },
  errores: {
    nombre:  '',
    email:   '',
    mensaje: '',
  },
  tocados: {
    nombre:  false,
    email:   false,
    mensaje: false,
  },
  enviando: false,
  enviado:  false,
};

/* ═══════════════════════════════════════════════
   REDUCER — maneja todo el estado del formulario
   Usamos 'tipo' en lugar de 'type' (convención del proyecto)
   ═══════════════════════════════════════════════ */
const reducer = (state, action) => {
  switch (action.tipo) {
    case 'ACTUALIZAR_CAMPO':
      return {
        ...state,
        campos: { ...state.campos, [action.campo]: action.valor },
      };

    case 'MARCAR_TOCADO':
      return {
        ...state,
        tocados: { ...state.tocados, [action.campo]: true },
      };

    case 'MARCAR_TODOS_TOCADOS':
      return {
        ...state,
        tocados: { nombre: true, email: true, mensaje: true },
      };

    case 'ESTABLECER_ERRORES':
      return { ...state, errores: action.errores };

    case 'ENVIANDO':
      return { ...state, enviando: true };

    case 'ENVIADO':
      return { ...state, enviando: false, enviado: true };

    case 'RESET':
      return estadoInicial;

    default:
      return state;
  }
};

/* ═══════════════════════════════════════════════
   FUNCIÓN DE VALIDACIÓN
   ═══════════════════════════════════════════════ */
const validar = (campos) => {
  const errores = {};

  if (!campos.nombre.trim()) {
    errores.nombre = 'El nombre es requerido.';
  } else if (campos.nombre.trim().length < 2) {
    errores.nombre = 'Mínimo 2 caracteres.';
  }

  if (!campos.email.trim()) {
    errores.email = 'El email es requerido.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email)) {
    errores.email = 'Email inválido.';
  }

  if (!campos.mensaje.trim()) {
    errores.mensaje = 'El mensaje es requerido.';
  } else if (campos.mensaje.trim().length < 10) {
    errores.mensaje = 'Mínimo 10 caracteres.';
  }

  return errores;
};

/* ═══════════════════════════════════════════════
   COMPONENTE ContactPage
   ═══════════════════════════════════════════════ */
const ContactPage = () => {
  const [state, dispatch] = useReducer(reducer, estadoInicial);
  const { campos, errores, tocados, enviando, enviado } = state;

  const nombreRef    = useRef(null);
  const formRef      = useRef(null);
  const [calHeight, setCalHeight] = useState(630);

  // useEffect: auto-focus en el campo nombre al cargar la página
  useEffect(() => {
    if (nombreRef.current) nombreRef.current.focus();
  }, []);

  // useEffect: carga el script de Calendly inline al montar
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // useEffect: escucha el mensaje de altura que envía Calendly via postMessage
  // Usa el máximo histórico para que nunca achique y genere scroll
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.event === 'calendly.page_height') {
        const h = e.data.payload.height;
        setCalHeight((prev) => Math.max(prev, h));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  /* ─── Handlers ──────────────────────────────── */

  const handleChange = (e) => {
    dispatch({ tipo: 'ACTUALIZAR_CAMPO', campo: e.target.name, valor: e.target.value });
  };

  const handleBlur = (e) => {
    dispatch({ tipo: 'MARCAR_TOCADO', campo: e.target.name });
    dispatch({ tipo: 'ESTABLECER_ERRORES', errores: validar(campos) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ tipo: 'MARCAR_TODOS_TOCADOS' });

    const erroresActuales = validar(campos);
    dispatch({ tipo: 'ESTABLECER_ERRORES', errores: erroresActuales });
    if (Object.keys(erroresActuales).length > 0) return;

    dispatch({ tipo: 'ENVIANDO' });
    setTimeout(() => {
      dispatch({ tipo: 'ENVIADO' });
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => dispatch({ tipo: 'RESET' }), 5000);
    }, 1200);
  };

  const claseInput = (campo) => {
    if (!tocados[campo]) return 'form-input';
    return `form-input ${errores[campo] ? 'is-invalid' : 'is-valid'}`;
  };

  /* ─── Render ─────────────────────────────────── */
  return (
    <div className="container">

      {/* Header */}
      <div className="mb-4 anim-0">
        <span className="section-label">Contacto</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>
          Hablemos <span style={{ color: 'var(--accent)' }}>de tu proyecto</span>
        </h1>
        <div className="divider" style={{ margin: '0.5rem 0 0' }} />
      </div>

      {/* ── Fila principal: datos + Calendly ── */}
      <div className="row g-3 anim-1 mb-5">

        {/* Columna izquierda: mis datos + título */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <div>
            <span className="section-label">Reunión online</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '0.4rem' }}>
              Agendemos una <span style={{ color: 'var(--accent)' }}>reunión</span>
            </h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', margin: 0 }}>
              Elegí el día y horario que mejor te quede. Videollamada de 30 min, sin compromiso.
            </p>
            <div className="divider" />
          </div>

          <div className="card-info">
            <span className="section-label">Email</span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', wordBreak: 'break-all', margin: 0 }}>
              juancarballo651@gmail.com
            </p>
          </div>

          <div className="card-info">
            <span className="section-label">Ubicación</span>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem', margin: 0 }}>
              Córdoba, Argentina
            </p>
          </div>

          <div className="card-info">
            <span className="section-label">GitHub</span>
            <a
              href="https://github.com/juancarball0"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}
            >
              github.com/juancarball0
            </a>
          </div>

          <div className="card-info">
            <span className="section-label">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/juan-francisco-carballo-b0078626b/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}
            >
              linkedin.com/in/juan-francisco-carballo
            </a>
          </div>
        </div>

        {/* Columna derecha: Calendly */}
        <div className="col-md-8">
          <div className="calendly-wrapper card-info" style={{ padding: 0 }}>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/juancarballo651/30min?hide_gdpr_banner=1&hide_event_type_details=1&background_color=09090E&text_color=EEEEF8&primary_color=FFD60A"
              style={{ width: '100%', height: `${calHeight}px`, minHeight: '680px' }}
            />
          </div>
        </div>
      </div>

      {/* ── Fila 2: formulario de email ── */}
      <div className="anim-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
        <div className="mb-4">
          <span className="section-label">Enviame un mensaje</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            O escribime por <span style={{ color: 'var(--accent)' }}>email</span>
          </h2>
          <div className="divider" />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8" ref={formRef}>

            {enviado && (
              <div className="alert-success mb-4 anim-0">
                ✓ Mensaje enviado correctamente. ¡Me contacto pronto!
                &nbsp;<small style={{ opacity: 0.7 }}>(se limpia en 5s)</small>
              </div>
            )}

            <div className="form-card">

              <div className="mb-4">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  ref={nombreRef}
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={claseInput('nombre')}
                  value={campos.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tu nombre completo"
                  autoComplete="off"
                />
                {tocados.nombre && errores.nombre && (
                  <p className="error-msg">{errores.nombre}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={claseInput('email')}
                  value={campos.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="tu@email.com"
                  autoComplete="off"
                />
                {tocados.email && errores.email && (
                  <p className="error-msg">{errores.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className={claseInput('mensaje')}
                  value={campos.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Contame sobre tu proyecto o consulta..."
                  rows={5}
                  style={{ resize: 'vertical' }}
                />
                {tocados.mensaje && errores.mensaje && (
                  <p className="error-msg">{errores.mensaje}</p>
                )}
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button className="btn-accent" onClick={handleSubmit} disabled={enviando}>
                  {enviando ? (
                    <span className="d-flex align-items-center gap-2">
                      <span className="loading-dots" style={{ transform: 'scale(0.55)', height: '8px' }}>
                        <span /><span /><span />
                      </span>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar mensaje →'
                  )}
                </button>

                <button className="btn-ghost" onClick={() => dispatch({ tipo: 'RESET' })} type="button">
                  Limpiar
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;

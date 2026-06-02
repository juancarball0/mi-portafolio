import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar    from './components/Navbar';
import HomePage    from './pages/HomePage';
import AboutPage   from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage  from './pages/ContactPage';
import useLocalStorage from './hooks/useLocalStorage';

/* ─── Scroll al top en cada cambio de ruta ── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/* ─── Página 404 ─────────────────────────── */
const NotFound = () => (
  <div className="container text-center py-5 anim-0">
    <span className="section-label">ERROR</span>
    <h1 style={{ fontSize: '6rem', color: 'var(--border-s)', fontWeight: 800 }}>404</h1>
    <p style={{ color: 'var(--fg-muted)' }}>Esta página no existe.</p>
    <a href="#/" className="btn-accent mt-3 d-inline-flex">Volver al inicio</a>
  </div>
);

/* ─── App ────────────────────────────────── */
const App = () => {
  // useLocalStorage: persiste preferencia de tema entre sesiones
  const [tema, setTema] = useLocalStorage('tema', 'dark');

  const toggleTema = () => setTema(prev => (prev === 'dark' ? 'light' : 'dark'));

  // Aplicar el tema al <html> usando data-tema para CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema);
  }, [tema]);

  return (
    <>
      <ScrollToTop />
      <Navbar tema={tema} toggleTema={toggleTema} />

      <main className="page">
        <Routes>
          <Route path="/"         element={<HomePage tema={tema} toggleTema={toggleTema} />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          ©  Juan Carballo 2026&nbsp;·&nbsp;
        </div>
      </footer>
    </>
  );
};

export default App;

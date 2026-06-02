import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Bootstrap CSS — primero para que nuestros estilos lo pisen
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouter: usa /#/ruta → funciona en GitHub Pages sin 404 */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);

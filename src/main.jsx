// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Asegúrate de que esta línea esté para estilos globales si los tienes
import { ThemeProvider, CssBaseline } from '@mui/material'; // <-- IMPORTAR ESTO
import theme from './theme'; // <-- IMPORTAR TU TEMA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* <-- ENVUELVE TU APP CON EL THEMEPROVIDER */}
      <CssBaseline /> {/* <-- NORMALIZA LOS ESTILOS Y APLICA EL FONDO DEL TEMA */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
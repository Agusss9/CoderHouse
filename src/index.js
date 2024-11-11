// src/index.js
import React, { forwardRef } from 'react'; // Correcto
import ReactDOM from 'react-dom/client'; // Asegúrate de usar ReactDOM.createRoot si usas React 18
import App from './App';
import './sass/styles.css'; // Importa tus estilos aquí si es necesario

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // Importa ChakraProvider
import App from './App'; // Asegúrate de que la ruta sea correcta
import '../sass/styles.css'; // Importa tus estilos

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
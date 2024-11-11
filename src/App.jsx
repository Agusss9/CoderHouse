// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';

const App = () => {
    const [itemCount, setItemCount] = useState(0); // Estado para contar los items en el carrito

    // Simulación de productos
    const products = [
        { id: 1, nombre: "MousePad FX TYPE-99", precio: 150 },
        { id: 2, nombre: "MousePad FX HIEN", precio: 200 },
        { id: 3, nombre: "MousePad FX SHIDENKAI V2", precio: 300 }
    ];

    return (
        <div>
            <Navbar itemCount={itemCount} />
            <ItemListContainer title="Nuestros Productos" items={products} />
        </div>
    );
};

export default App;
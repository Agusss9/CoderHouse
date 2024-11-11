// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ itemCount }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#4d339b', color: 'white' }}>
            <div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Inicio</Link>
                <Link to="/tienda" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Tienda</Link>
                <Link to="/nosotros" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Nosotros</Link>
                <Link to="/contacto" style={{ color: 'white', textDecoration: 'none' }}>Contacto</Link>
            </div>
            <CartWidget itemCount={itemCount} />
        </nav>
    );
};

export default Navbar;
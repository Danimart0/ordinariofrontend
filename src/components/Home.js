import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a Ordinario Electrodomésticos</h1>
      <p>Encuentra aquí los mejores productos, categorías y proveedores para tu hogar.</p>
      <p>Explora nuestras secciones para descubrir todo lo que ofrecemos:</p>
      <ul className="navbar">
        <li><Link to="/categorias">Categorías de electrodomésticos</Link></li>
        <li><Link to="/productos">Productos disponibles</Link></li>
        <li><Link to="/proveedores">Nuestros proveedores</Link></li>
        <li><Link to="/historial">Historial de compras y movimientos</Link></li>
      </ul>
      <p>¡Gracias por visitarnos!</p>
    </div>
  );
};

export default Home;

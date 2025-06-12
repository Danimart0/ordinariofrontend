import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

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
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>

      <img
        className='home-img'
        src='https://eldiariony.com/wp-content/uploads/sites/2/2024/12/16-electrodomesticos-de-tu-hogar-que-hacen-que-tu-factura-de-electricidad-sea-cara-shutterstock_2473408983.jpg?w=4096'
        alt="Electrodomésticos"
      />

      <p>¡Gracias por usar nuestro servicio!</p>

      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;

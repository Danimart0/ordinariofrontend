import '../css/Perfil.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('http://localhost:8000/api/perfil/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(res.data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchPerfil();
  }, []);

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className='perfil-container' style={{ padding: 20 }}>
      <Link to="/" className="btn-regresar">
        ← Regresar a Inicio
      </Link>
      <h2>Mi Perfil</h2>
      <p><strong>Usuario:</strong> {usuario.username}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
    </div>
  );
}

export default Perfil;

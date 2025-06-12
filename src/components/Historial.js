import React, { useState, useEffect } from 'react';

function Historial() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/historial/')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar historial');
        return res.json();
      })
      .then(data => {
        setHistorial(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  if (historial.length === 0) {
    return <p>No hay movimientos en el historial.</p>;
  }

  return (
    <div>
      <h2>Historial de Movimientos</h2>
      <ul>
        {historial.map(item => (
          <li key={item.id}>
            <strong>{item.tipo_movimiento || 'Movimiento'}</strong> - {item.descripcion || 'Sin descripción'} - {item.fecha || 'Fecha no disponible'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;

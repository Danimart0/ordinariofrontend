import React, { useState, useEffect } from 'react';

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/proveedores/')
      .then(res => res.json())
      .then(data => setProveedores(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nombre, telefono, correo };

    if (editingId) {
      fetch(`http://localhost:8000/api/proveedores/${editingId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(() => {
        setProveedores(proveedores.map(p => p.id === editingId ? { ...p, ...data } : p));
        resetForm();
      });
    } else {
      fetch('http://localhost:8000/api/proveedores/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(newProv => setProveedores([...proveedores, newProv]));
      resetForm();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNombre('');
    setTelefono('');
    setCorreo('');
  };

  const handleEdit = (prov) => {
    setEditingId(prov.id);
    setNombre(prov.nombre);
    setTelefono(prov.telefono || '');
    setCorreo(prov.correo || '');
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/proveedores/${id}/`, { method: 'DELETE' })
      .then(() => setProveedores(proveedores.filter(p => p.id !== id)));
  };

  return (
    <div>
      <h2>Proveedores</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <ul>
        {proveedores.map(prov => (
          <li key={prov.id}>
            <strong>{prov.nombre}</strong> - Tel: {prov.telefono} - Correo: {prov.correo}
            <button onClick={() => handleEdit(prov)}>Editar</button>
            <button onClick={() => handleDelete(prov.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Proveedores;

import React, { useState, useEffect } from 'react';
import '../css/Categorias.css';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Obtener lista de categorías
  useEffect(() => {
    fetch('http://localhost:8000/api/categorias/')
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  // Crear o editar categoría
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (imagen) formData.append('imagen', imagen);

    const url = editingId
      ? `http://localhost:8000/api/categorias/${editingId}/`
      : 'http://localhost:8000/api/categorias/';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then(() => fetch('http://localhost:8000/api/categorias/'))
      .then(res => res.json())
      .then(data => {
        setCategorias(data);
        setEditingId(null);
        setNombre('');
        setDescripcion('');
        setImagen(null);
        setMostrarFormulario(false);
      });
  };

  // Cargar categoría a editar
  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setNombre(cat.nombre);
    setDescripcion(cat.descripcion || '');
    setImagen(null);
    setMostrarFormulario(true);
  };

  // Eliminar categoría
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/categorias/${id}/`, { method: 'DELETE' })
      .then(() => setCategorias(categorias.filter(cat => cat.id !== id)));
  };

  return (
    <div className="categorias-container">
      <h2>Categorías</h2>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Cerrar formulario' : 'Agregar nueva categoría'}
      </button>

      {mostrarFormulario && (
        <form
          className="categorias-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImagen(e.target.files[0])}
          />
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setNombre('');
                setDescripcion('');
                setImagen(null);
                setMostrarFormulario(false);
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      )}

      <ul className="categorias-list">
        {categorias.map(cat => (
          <li key={cat.id}>
            <div className="categoria-info">
              <strong>{cat.nombre}</strong> - {cat.descripcion}
              {cat.imagen && (
                <img
                  src={`http://localhost:8000${cat.imagen}`}
                  alt={cat.nombre}
                  width="80"
                />
              )}
            </div>
            <div className="categoria-buttons">
              <button onClick={() => handleEdit(cat)}>Editar</button>
              <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;

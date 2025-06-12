import React, { useState, useEffect } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null); // Imagen
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Mostrar formulario

  useEffect(() => {
    fetch('http://localhost:8000/api/productos/')
      .then(res => res.json())
      .then(data => setProductos(data));

    fetch('http://localhost:8000/api/categorias/')
      .then(res => res.json())
      .then(data => setCategorias(data));

    fetch('http://localhost:8000/api/proveedores/')
      .then(res => res.json())
      .then(data => setProveedores(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoriaId);
    formData.append('proveedor', proveedorId);
    formData.append('stock', stock);
    formData.append('precio', precio);
    if (imagen) formData.append('imagen', imagen);

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/productos/${editingId}/`
      : 'http://localhost:8000/api/productos/';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        fetch('http://localhost:8000/api/productos/')
          .then(res => res.json())
          .then(data => setProductos(data));
        resetForm();
        setShowForm(false);
      });
  };

  const resetForm = () => {
    setEditingId(null);
    setNombre('');
    setDescripcion('');
    setCategoriaId('');
    setProveedorId('');
    setStock(0);
    setPrecio('');
    setImagen(null);
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion || '');
    setCategoriaId(producto.categoria);
    setProveedorId(producto.proveedor);
    setStock(producto.stock);
    setPrecio(producto.precio);
    setImagen(null);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/productos/${id}/`, { method: 'DELETE' })
      .then(() => setProductos(productos.filter(p => p.id !== id)));
  };

  return (
    <div>
      <h2>Productos</h2>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>Crear nuevo producto</button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <input
            placeholder="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
          <select
            value={categoriaId}
            onChange={e => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Selecciona categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <select
            value={proveedorId}
            onChange={e => setProveedorId(e.target.value)}
          >
            <option value="">Selecciona proveedor</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>{prov.nombre}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            step="0.01"
            min="0"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImagen(e.target.files[0])}
          />
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
          <button type="button" onClick={() => {
            resetForm();
            setShowForm(false);
          }}>Cancelar</button>
        </form>
      )}

      <ul>
        {productos.map(prod => (
          <li key={prod.id}>
            <strong>{prod.nombre}</strong> - {prod.descripcion} - Stock: {prod.stock} - Precio: {prod.precio}
            {prod.imagen && (
              <img
                src={`http://localhost:8000${prod.imagen}`}
                alt={prod.nombre}
                width="50"
                style={{ marginLeft: '10px' }}
              />
            )}
            <div>
              <button onClick={() => handleEdit(prod)}>Editar</button>
              <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;

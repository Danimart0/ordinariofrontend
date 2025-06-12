import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    fetch('http://localhost:8000/api/productos/')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
      })
      .catch(e => console.error('Error cargando productos:', e));

    fetch('http://localhost:8000/api/categorias/')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(e => console.error('Error cargando categorias:', e));

    fetch('http://localhost:8000/api/proveedores/')
      .then(res => res.json())
      .then(data => setProveedores(data))
      .catch(e => console.error('Error cargando proveedores:', e));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !categoriaId || !precio) {
      alert('Completa los campos obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoriaId);
    formData.append('proveedor', proveedorId);
    formData.append('stock', stock);
    formData.append('precio', precio);
    if (imagen) formData.append('imagen', imagen);

    const url = editingId
      ? `http://localhost:8000/api/productos/${editingId}/`
      : 'http://localhost:8000/api/productos/';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        // NO PONGAS headers 'Content-Type' aquí para que el navegador lo gestione
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error en el servidor:', errorData);
        alert('Error al guardar producto');
        return;
      }

      await cargarDatos();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error en fetch:', error);
      alert('Error de conexión');
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setNombre(producto.nombre || '');
    setDescripcion(producto.descripcion || '');
    setCategoriaId(producto.categoria || '');
    setProveedorId(producto.proveedor || '');
    setStock(producto.stock || 0);
    setPrecio(producto.precio || '');
    setImagen(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
      const res = await fetch(`http://localhost:8000/api/productos/${id}/`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        alert('Error al eliminar producto');
        return;
      }
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error de conexión');
    }
  };

  const abrirDetalles = (producto) => {
    setProductoDetalle(producto);
  };

  const cerrarDetalles = () => {
    setProductoDetalle(null);
  };

  return (
    <div className='productos-container'>
      <Link to="/" className="btn-regresar">
        ← Regresar a Inicio
      </Link>

      <h2>Productos</h2>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>Crear nuevo producto</button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            placeholder="Nombre *"
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
            onChange={e => setStock(Number(e.target.value))}
            min="0"
          />
          <input
            type="number"
            placeholder="Precio *"
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
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
          >
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {productos.map(prod => (
          <li key={prod.id}>
            <strong>{prod.nombre}</strong> - {prod.descripcion} - Stock: {prod.stock} - Precio: {prod.precio}
            {prod.imagen ? (
              <img
                src={prod.imagen}
                alt={prod.nombre}
                width="50"
                style={{ marginLeft: '10px' }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/50?text=No+Img';
                }}
              />
            ) : (
              <span style={{ marginLeft: '10px', color: 'red' }}>Sin imagen</span>
            )}
            <div>
              <button onClick={() => handleEdit(prod)}>Editar</button>
              <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
              <button onClick={() => abrirDetalles(prod)}>Ver detalles</button>
            </div>
          </li>
        ))}
      </ul>

      {productoDetalle && (
        <div
          className="modal-overlay"
          onClick={cerrarDetalles}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80%',
              overflowY: 'auto',
              textAlign: 'center',
            }}
          >
            <h3>{productoDetalle.nombre}</h3>
            {productoDetalle.imagen ? (
              <img
                src={productoDetalle.imagen}
                alt={productoDetalle.nombre}
                style={{ maxWidth: '100%', height: 'auto', marginBottom: '15px' }}
              />
            ) : (
              <p>Sin imagen</p>
            )}
            <p><strong>Descripción:</strong> {productoDetalle.descripcion}</p>
            <p><strong>Categoría:</strong> {productoDetalle.categoria}</p>
            <p><strong>Proveedor:</strong> {productoDetalle.proveedor}</p>
            <p><strong>Stock:</strong> {productoDetalle.stock}</p>
            <p><strong>Precio:</strong> {productoDetalle.precio}</p>
            <button onClick={cerrarDetalles}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;

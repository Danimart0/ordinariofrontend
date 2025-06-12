
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [imagen, setImagen]     = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      await axios.post(
        'http://localhost:8000/api/register/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Registro</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Imagen de perfil (opcional):</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImagen(e.target.files[0])}
        />
      </div>

      <button type="submit" style={{ width: '100%', padding: 10 }}>
        Registrarse
      </button>
    </form>
  );
}

export default Register;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Categorias from './components/Categorias';
import Productos from './components/Productos';
import Proveedores from './components/Proveedores';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Perfil from './components/Perfil';

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/login" element={<Login />} />

    
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
        <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path="/proveedores" element={<PrivateRoute><Proveedores /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />

      </Routes>
    </Router>
  );
}

export default App;

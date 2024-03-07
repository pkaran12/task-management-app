
import React from 'react';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard"  element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;

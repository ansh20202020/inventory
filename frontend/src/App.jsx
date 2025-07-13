import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <PrivateRoute>
                <Navbar />
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/products" element={
              <PrivateRoute>
                <Navbar />
                <ProductList />
              </PrivateRoute>
            } />
            <Route path="/add-product" element={
              <PrivateRoute>
                <Navbar />
                <ProductForm />
              </PrivateRoute>
            } />
            <Route path="/products/:id/edit" element={
              <PrivateRoute>
                <Navbar />
                <ProductForm />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
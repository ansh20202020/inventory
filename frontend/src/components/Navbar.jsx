import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '1rem 0',
    marginBottom: '20px'
  };

  const navContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const brand = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white'
  };

  const navLinks = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };

  const navLink = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  const activeLink = {
    ...navLink,
    backgroundColor: '#007bff'
  };

  const userInfo = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  return (
    <nav style={navStyle}>
      <div style={navContainer}>
        <Link to="/" style={brand}>
          📦 Inventory Manager
        </Link>
        
        <div style={navLinks}>
          <Link 
            to="/" 
            style={location.pathname === '/' ? activeLink : navLink}
          >
            Dashboard
          </Link>
          <Link 
            to="/products" 
            style={location.pathname === '/products' ? activeLink : navLink}
          >
            Products
          </Link>
          <Link 
            to="/add-product" 
            style={location.pathname === '/add-product' ? activeLink : navLink}
          >
            Add Product
          </Link>
        </div>

        <div style={userInfo}>
          <span>Welcome, {user?.username}</span>
          <button 
            onClick={logout}
            style={{
              ...navLink,
              backgroundColor: '#dc3545',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, productsResponse] = await Promise.all([
        productsAPI.getStats(),
        productsAPI.getAll()
      ]);
      
      setStats(statsResponse.data);
      setLowStockProducts(productsResponse.data.lowStockProducts);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  const statNumber = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '10px'
  };

  const statLabel = {
    fontSize: '1rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const lowStockCard = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px'
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-4 mb-20">
        <div style={cardStyle}>
          <div style={statNumber}>{stats?.totalProducts || 0}</div>
          <div style={statLabel}>Total Products</div>
        </div>
        
        <div style={cardStyle}>
          <div style={{...statNumber, color: '#dc3545'}}>
            {stats?.lowStockProducts || 0}
          </div>
          <div style={statLabel}>Low Stock Items</div>
        </div>
        
        <div style={cardStyle}>
          <div style={{...statNumber, color: '#28a745'}}>
            {stats?.categories?.length || 0}
          </div>
          <div style={statLabel}>Categories</div>
        </div>
        
        <div style={cardStyle}>
          <div style={{...statNumber, color: '#17a2b8'}}>
            ${stats?.totalValue?.toFixed(2) || '0.00'}
          </div>
          <div style={statLabel}>Total Value</div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="card">
          <h2 style={{color: '#dc3545', marginBottom: '15px'}}>
            ⚠️ Low Stock Alert ({lowStockProducts.length} items)
          </h2>
          <div className="grid grid-2">
            {lowStockProducts.map(product => (
              <div key={product._id} style={lowStockCard}>
                <h4>{product.name}</h4>
                <p>Current Stock: <strong>{product.quantity}</strong></p>
                <p>Threshold: {product.lowStockThreshold}</p>
                <Link to={`/products/${product._id}/edit`} className="btn btn-sm btn-primary">
                  Restock
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Overview */}
      {stats?.categories && (
        <div className="card">
          <h2>Categories Overview</h2>
          <div className="grid grid-3">
            {stats.categories.map(category => (
              <div key={category._id} style={cardStyle}>
                <div style={{...statNumber, fontSize: '1.5rem'}}>{category.count}</div>
                <div style={statLabel}>{category._id}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <h2>Quick Actions</h2>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <Link to="/add-product" className="btn btn-primary">
            Add New Product
          </Link>
          <Link to="/products" className="btn btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
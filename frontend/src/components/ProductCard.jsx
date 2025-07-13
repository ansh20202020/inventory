import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px'
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  };

  const categoryStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '10px'
  };

  const priceStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '10px'
  };

  const stockStyle = {
    fontSize: '0.9rem',
    marginBottom: '10px',
    color: product.quantity <= product.lowStockThreshold ? '#dc3545' : '#28a745'
  };

  const actionsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto'
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/200/200';
    return `http://localhost:5000${imagePath}`;
  };

  return (
    <div style={cardStyle}>
      {/* <img 
        src={getImageUrl(product.image)} 
        alt={product.name}
        style={imageStyle}
        onError={(e) => {
          e.target.src = '/api/placeholder/200/200';
        }}
      /> */}
      
      <div style={titleStyle}>{product.name}</div>
      <div style={categoryStyle}>{product.category}</div>
      <div style={priceStyle}>${product.price.toFixed(2)}</div>
      <div style={stockStyle}>
        Stock: {product.quantity} 
        {product.quantity <= product.lowStockThreshold && ' ⚠️'}
      </div>
      <div style={{fontSize: '0.8rem', color: '#666', marginBottom: '10px'}}>
        SKU: {product.sku}
      </div>
      
      <div style={actionsStyle}>
        <Link to={`/products/${product._id}/edit`} className="btn btn-sm btn-primary">
          Edit
        </Link>
        <button 
          onClick={() => onDelete(product._id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
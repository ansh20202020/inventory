import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from './ProductCard';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../utils/constants';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({
        search: searchTerm,
        category: selectedCategory,
        sortBy,
        order: sortOrder
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(productId);
        setProducts(products.filter(p => p._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const filtersStyle = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const viewToggleStyle = {
    display: 'flex',
    gap: '5px'
  };

  const toggleButtonStyle = (active) => ({
    padding: '8px 12px',
    border: '1px solid #ddd',
    backgroundColor: active ? '#007bff' : 'white',
    color: active ? 'white' : '#333',
    cursor: 'pointer',
    borderRadius: '4px'
  });

  return (
    <div className="container">
      <h1>Products</h1>
      
      {/* Filters */}
      <div style={filtersStyle}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px'
          }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="all">All Categories</option>
          {PRODUCT_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              Sort by {option.label}
            </option>
          ))}
        </select>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        
        <div style={viewToggleStyle}>
          <button
            style={toggleButtonStyle(viewMode === 'grid')}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            style={toggleButtonStyle(viewMode === 'list')}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {/* Products Display */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div style={{marginBottom: '20px'}}>
            <strong>{products.length} products found</strong>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-3">
              {products.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="card">
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '1px solid #ddd'}}>
                    <th style={{padding: '10px', textAlign: 'left'}}>Image</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Name</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Category</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Price</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Stock</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>SKU</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} style={{borderBottom: '1px solid #eee'}}>
                      <td style={{padding: '10px'}}>
                        <img 
                          src={product.image ? `http://localhost:5000${product.image}` : '/api/placeholder/50/50'} 
                          alt={product.name}
                          style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}}
                        />
                      </td>
                      <td style={{padding: '10px'}}>{product.name}</td>
                      <td style={{padding: '10px'}}>{product.category}</td>
                      <td style={{padding: '10px'}}>${product.price.toFixed(2)}</td>
                      <td style={{
                        padding: '10px',
                        color: product.quantity <= product.lowStockThreshold ? '#dc3545' : '#333'
                      }}>
                        {product.quantity} {product.quantity <= product.lowStockThreshold && '⚠️'}
                      </td>
                      <td style={{padding: '10px'}}>{product.sku}</td>
                      <td style={{padding: '10px'}}>
                        <div style={{display: 'flex', gap: '5px'}}>
                          <Link to={`/products/${product._id}/edit`} className="btn btn-sm btn-primary">
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
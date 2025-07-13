import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { PRODUCT_CATEGORIES } from '../utils/constants';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    sku: '',
    lowStockThreshold: '5',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [existingProduct, setExistingProduct] = useState(null);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [isEdit, id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      const product = response.data;

      setExistingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        category: product.category,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        sku: product.sku,
        lowStockThreshold: product.lowStockThreshold.toString(),
        image: null
      });

      if (product.image) {
        setImagePreview(`http://localhost:5000${product.image}`);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.quantity || !formData.sku) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.price) < 0) {
      setError('Price cannot be negative');
      return;
    }

    if (parseInt(formData.quantity) < 0) {
      setError('Quantity cannot be negative');
      return;
    }

    try {
      setLoading(true);
      const submitData = new FormData();
      
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('price', formData.price);
      submitData.append('quantity', formData.quantity);
      submitData.append('sku', formData.sku);
      submitData.append('lowStockThreshold', formData.lowStockThreshold);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      if (isEdit) {
        await productsAPI.update(id, submitData);
        setSuccess('Product updated successfully!');
      } else {
        await productsAPI.create(submitData);
        setSuccess('Product created successfully!');
      }

      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const imagePreviewStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginTop: '10px'
  };

  if (loading && isEdit) {
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
      <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      
      <div style={formStyle}>
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label>SKU *</label>
              <input
                type="text"
                name="sku"
                className="form-control"
                value={formData.sku}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input
                type="number"
                name="lowStockThreshold"
                className="form-control"
                value={formData.lowStockThreshold}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={imagePreviewStyle}
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
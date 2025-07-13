# 🧾 Inventory Management System

A complete MERN stack inventory management system for small stores, featuring JWT authentication, product management, and low stock alerts.

---

## 🚀 Features

- 🔐 **Authentication**: JWT-based login with bcrypt password hashing
- 📦 **Product Management**: Add, edit, delete products with image upload
- 📉 **Stock Tracking**: Real-time monitoring with low stock alerts
- 🔍 **Search & Filter**: Find products by name, category, or SKU
- 📊 **Dashboard**: Overview of inventory, stock, and categories
- 📱 **Responsive Design**: Works across desktop and mobile devices

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, React Router DOM, Axios  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT, bcrypt  
- **File Upload**: Multer  
- **Security**: Helmet, CORS, Rate limiting

---

## 📦 Installation Guide

### ✅ Prerequisites

- Node.js v14+
- MongoDB (local or cloud)
- npm or yarn

---

### 🔧 Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inventory_management
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
   NODE_ENV=development
   ```

4. Start MongoDB (if using local MongoDB)

5. Run the backend server:
   ```bash
   npm run dev
   ```

---

### 🎨 Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🧪 Usage

1. Open browser and go to: [http://localhost:5173](http://localhost:5173)
2. Register or log in
3. Access dashboard to:
   - Add/edit/delete products
   - View inventory stats
   - Monitor stock levels
   - Get alerts for low-stock items

---

## 📡 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login with credentials |
| GET    | `/api/auth/me`       | Get current user profile |

### 📦 Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/products`          | Get all products (with filters) |
| GET    | `/api/products/:id`      | Get product by ID |
| POST   | `/api/products`          | Create new product |
| PUT    | `/api/products/:id`      | Update product |
| DELETE | `/api/products/:id`      | Delete product |
| GET    | `/api/products/stats`    | Get dashboard stats |

---

## 📁 Project Structure

```
inventory-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── products.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🔐 Security Features

- Password hashing with bcrypt
- JWT authentication
- Route protection via middleware
- Input validation
- CORS setup
- Rate limiting
- File type and size restrictions

---

## 🧪 Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 📦 Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Start production backend server
cd ../backend
npm start
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Push to your fork  
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Support

For support, raise an issue or contact the development team.

---

## 🛠 Setup Summary

1. Create all necessary files and folders (refer project structure)
2. Install all dependencies (backend & frontend)
3. Set up your MongoDB and `.env` file
4. Create the `/uploads` folder in backend
5. Start backend and frontend servers

🎉 You now have a fully functional inventory management system with:

- 🔐 JWT auth  
- 📦 Product CRUD with image support  
- 🔔 Low stock notifications  
- 📊 Stats dashboard  
- 🔍 Search/filter  
- 🛡 Security middleware  
- ❗ Error handling

---

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    console.log('Login Result:', result);
    if (result.success) {
      navigate('/');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '2rem'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={titleStyle}>📦 Login</h2>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { authAPI } from '../services/api';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [showRegister, setShowRegister] = useState(false);
//   const [registerData, setRegisterData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const { login, loading, error, clearError, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     clearError();
//   }, [showRegister, clearError]);

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const result = await login(formData);
//     console.log('Login Result:', result);
//     if (result.success) {
//       navigate('/');
//     }
//   };

//   const handleRegisterSubmit = async (e) => {
//   e.preventDefault();
//   if (registerData.password !== registerData.confirmPassword) {
//     alert('Passwords do not match');
//     return;
//   }

//   try {
//     const response = await authAPI.register({
//       username: registerData.username,
//       email: registerData.email,
//       password: registerData.password
//     });
    
//     if (response.data) {
//       alert('Registration successful! Please login.');
//       setShowRegister(false);
//     }
//   } catch (error) {
//     const message = error.response?.data?.message || 'Registration failed';
//     alert(message);
//   }
// };

//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f8f9fa'
//   };

//   const formStyle = {
//     backgroundColor: 'white',
//     padding: '40px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px'
//   };

//   const titleStyle = {
//     textAlign: 'center',
//     marginBottom: '30px',
//     color: '#333',
//     fontSize: '2rem'
//   };

//   const switchStyle = {
//     textAlign: 'center',
//     marginTop: '20px'
//   };

//   const linkStyle = {
//     color: '#007bff',
//     cursor: 'pointer',
//     textDecoration: 'underline'
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={formStyle}>
//         <h2 style={titleStyle}>
//           📦 {showRegister ? 'Register' : 'Login'}
//         </h2>
        
//         {error && (
//           <div className="alert alert-error">
//             {error}
//           </div>
//         )}

//         {!showRegister ? (
//           <form onSubmit={handleLoginSubmit}>
//             <div className="form-group">
//               <label>Username or Email</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={formData.username}
//                 onChange={(e) => setFormData({...formData, username: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 required
//               />
//             </div>
            
//             <button 
//               type="submit" 
//               className="btn btn-primary"
//               style={{width: '100%'}}
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleRegisterSubmit}>
//             <div className="form-group">
//               <label>Username</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={registerData.username}
//                 onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={registerData.email}
//                 onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={registerData.password}
//                 onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={registerData.confirmPassword}
//                 onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
//                 required
//               />
//             </div>
            
//             <button 
//               type="submit" 
//               className="btn btn-primary"
//               style={{width: '100%'}}
//             >
//               Register
//             </button>
//           </form>
//         )}

//         <div style={switchStyle}>
//           {!showRegister ? (
//             <p>
//               Don't have an account?{' '}
//               <span style={linkStyle} onClick={() => setShowRegister(true)}>
//                 Register here
//               </span>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{' '}
//               <span style={linkStyle} onClick={() => setShowRegister(false)}>
//                 Login here
//               </span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
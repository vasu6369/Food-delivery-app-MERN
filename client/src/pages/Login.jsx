import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/Context';
import Swal from 'sweetalert2';
import Google from '../components/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(StoreContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await login({ email, password});
    if (res.success) {
      
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back! 🎉",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/');
    } else {
      alert(res.msg);
    }
  };


  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}className='mb-3'>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className="btn btn-danger w-100">Login</button>

        </form>

        <Google/>
        <p className="text-center mt-3">Don't have an account? <a href="/signup" className="text-danger">Sign Up</a></p>
      </div>
    </div>
  );
}

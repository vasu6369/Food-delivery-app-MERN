import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/Context';
import Swal from 'sweetalert2';
import Google from '../components/google';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const {signup}=useContext(StoreContext);
  const handleSignup = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const userDetails = { name,email, password };
    let res=await signup(userDetails);
    console.log(res);
    console.log(res.success);
    if(res.success){

      Swal.fire({
        title: "Signup Successful!",
        text: "Welcome to our platform 🎉",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    }
    else{
      alert(res.msg);
    }
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className='mb-3'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </div>
          <button type="submit" className="btn btn-danger w-100">Sign Up</button>
        </form>
        <Google/>
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-danger">Login</a>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import '../cssComponents/loginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://academics.newtonschool.co/api/v1/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            projectId: 'fd4c0stueyxj',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        login(token);
        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form className='loginform' onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Sign up here</Link>
      </p>
    </div>
  );
}

export default LoginPage;

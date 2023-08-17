import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import '../cssComponents/signupPage.css';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://academics.newtonschool.co/api/v1/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            projectId: 'fd4c0stueyxj',
          },
          body: JSON.stringify({
            name,
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
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <form className='signupform' onSubmit={handleSignup}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;

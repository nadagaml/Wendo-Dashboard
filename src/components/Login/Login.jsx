import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../images/logo.png';
import login_pic from '../../images/Graphic Side.svg';
import Google from '../../images/Socail Links.png';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const response = await axios.post('/api/auth/login', {
        phoneNumber,
        password
      });
  
      setSuccessMessage('Login successful!');
      console.log('Response:', response.data);
  
      // ممكن تخزن التوكن هنا
      // localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      if (error.response) {
        setErrorMessage('Login failed. Please check your credentials.');
        console.error('Server response:', error.response.data); // 
      } else {
        setErrorMessage('Network error, please try again.');
      }
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <img src={logo} alt="logo" className="h-10" />
              <span>Wendo</span>
            </h1>
          </div>
          <h2 className="text-xl font-semibold mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to stay connected.</p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1 text-left">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6768A7]"
                placeholder="+201234567890"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1 text-left">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6768A7]"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#6768A7] text-white py-2 rounded-lg hover:bg-[#7778b7]"
            >
              Sign in
            </button>

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
          </form>

          <div className="text-center my-4 text-sm text-gray-600">or sign in with other accounts?</div>
          <div className="flex justify-center mb-4">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <img src={Google} alt="Google" className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-[#3A57E8] hover:underline">
              Click here to sign up.
            </a>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center">
          <img src={login_pic} alt="Illustration" className="w-3/4 h-auto" />
        </div>
      </div>
    </div>
  );
}

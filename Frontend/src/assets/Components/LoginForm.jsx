import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Image Section */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-white">
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*2z4iV_SFZY1mXFUy"
          alt="AI Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-black">
        <div className="max-w-md w-full p-10 bg-black rounded-lg shadow-lg">
          {/* Logo */}
          <div className="text-center mb-6 ">
            <img
              src="https://i.postimg.cc/pXjc4GK2/algoflex-logo.png"
              alt="Skilldify Logo"
              className="mx-auto h-80 w-80"
            />
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm font-medium text-teal-400 hover:text-teal-300">
                Forgot password?
              </a>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

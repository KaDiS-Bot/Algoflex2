import React, { useState } from "react";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitEmail = () => {
    if (validateEmail(email)) {
      alert("Email submitted: " + email);
      window.location.href = "/password-reset-confirmation";
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md animate-slide-down">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-teal-700 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Forgot Password</h2>
          <button
            className="text-xl leading-none hover:text-gray-300"
            aria-label="Close modal"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            Please enter your email to reset your password. We will send a link
            to your registered email address.
          </p>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter Email Address"
              id="email"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <button
            onClick={submitEmail}
            className="w-full py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-md hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

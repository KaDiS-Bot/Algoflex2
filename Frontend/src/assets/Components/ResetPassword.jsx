import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gay-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-centr">
          Reset Password
        </h2>

        {/* New Password Input */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Enter New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter New Password"
            className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters</p>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={passwordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 hover:text-gray-300"
          >
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223a10.451 10.451 0 011.093-1.443M21 12a9.966 9.966 0 01-1.934 5.516m-.055.059a10.448 10.448 0 01-2.758 1.657m-1.42.636a10.451 10.451 0 01-5.38 0M8.104 19.27c-1.012-.457-1.93-.999-2.742-1.63M4.976 15.976a10.448 10.448 0 01-1.422-1.691M3 12a9.965 9.965 0 011.98-5.442m.003-.005a10.448 10.448 0 012.765-1.65M8.183 4.5a10.451 10.451 0 015.366 0m1.422.635a10.448 10.448 0 012.758 1.655m.055.06a10.451 10.451 0 011.934 2.143m1.093 1.443"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223a10.451 10.451 0 011.093-1.443M21 12a9.966 9.966 0 01-1.934 5.516m-.055.059a10.448 10.448 0 01-2.758 1.657m-1.42.636a10.451 10.451 0 01-5.38 0M8.104 19.27c-1.012-.457-1.93-.999-2.742-1.63M4.976 15.976a10.448 10.448 0 01-1.422-1.691M3 12a9.965 9.965 0 011.98-5.442m.003-.005a10.448 10.448 0 012.765-1.65M8.183 4.5a10.451 10.451 0 015.366 0m1.422.635a10.448 10.448 0 012.758 1.655m.055.06a10.451 10.451 0 011.934 2.143m1.093 1.443M3.98 8.223a10.451 10.451 0 00-1.093 1.443m-.003.005a10.448 10.448 0 00-1.98 5.442m0 0a9.965 9.965 0 001.934 5.516m.055.059a10.451 10.451 0 002.758 1.657m1.42.636a10.448 10.448 0 005.38 0m1.422-.636a10.451 10.451 0 002.758-1.657m.055-.059a9.966 9.966 0 001.934-5.516m0 0a10.448 10.448 0 00-1.98-5.442m-.003-.005a10.451 10.451 0 00-1.093-1.443"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

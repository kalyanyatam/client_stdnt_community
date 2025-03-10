import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem("token", response.data.token);
          navigate("/chat");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left side - Login Form */}
        <div className="lg:w-1/2 p-8">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-black focus:border-black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="******"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-black focus:border-black"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-6"
            >
              Login
            </button>
            <div className="flex justify-between items-center">
              <Link to="/forgotPassword" className="text-blue-500">
                Forgot Password?
              </Link>
              <p className="ml-4">
                Don't Have an Account?{" "}
                <Link to="/signup" className="text-blue-500">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg?ga=GA1.1.914380807.1723369038&semt=ais_hybrid"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContex } from "../../Firebase/AuthProvider";
import logo from "../../assets/1.png"

const Login = () => {
  const { SignInWithPassword,googleSignIn } = useContext(authContex);
  const navigate = useNavigate();
  const location = useLocation();
  const pathform = location?.state || "/";
  const [error, setError] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Call the SignInWithPassword function with email and password
    SignInWithPassword(email, password)
      .then(response => {
        navigate(pathform);
      })
      .catch(error => {
        setError('Error signing in. Please check your email and password.');
        console.error('Error signing in', error);
      });
  };
  const handleGoogleSignin = () => {
    googleSignIn()
    .then(result=>{
      if (result.user) {
       alert("Sign In sucsessfully");
        navigate(pathform);
      }
      })
      .catch((error) => {
        alert(error.message.slice(10));
      });
  };

  return (
    <div className="w-full max-w-sm p-6 my-16 m-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-center">
        <Link to="/">
          <img className="w-24 rounded-lg h-24" src={logo} alt="" />
        </Link>
      </div>

      <form onSubmit={handleSignin} className="mt-6">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-800">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm text-gray-800">
              Password
            </label>
            <a href="#" className="text-xs text-gray-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <input
            name="password"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-2.5  text-sm font-medium tracking-wide text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Sign In
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b lg:w-1/5"></span>
        <a href="#" className="text-xs text-center text-gray-500 uppercase hover:underline">
          or login with Social Media
        </a>
        <span className="w-1/5 border-b lg:w-1/5"></span>
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <button
          type="button"
          onClick={()=>handleGoogleSignin()}
          className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
        >
          <FaGoogle className="w-4 h-4 mx-2" />
          <span className="hidden mx-2 sm:inline">Sign in with Google</span>
        </button>
      </div>

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        Don't have an account?{" "}
        <Link to="/Signup" className="font-medium text-gray-700 hover:underline">
          Create One
        </Link>
      </p>
    </div>
  );
};

export default Login;

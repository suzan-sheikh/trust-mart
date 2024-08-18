import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContex } from "../../Firebase/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../Firebase/firebase-config";
import logo from "../../assets/2.png"
const Signup = () => {
  const { registerWithPassword } = useContext(authContex);
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');
  const [profileUpdateError, setProfileUpdateError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.userName.value;
    const emailAdress = form.emailAdress.value;
    const password = form.password.value;
    registerWithPassword(emailAdress, password)
      .then((result) => {
      console.log(result);
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
            setProfileUpdateError("Something went wrong while updating the profile");
          });
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setRegistrationError("Registration failed");
      });
  };

  return (
    <div className="w-full max-w-sm p-6 my-16 m-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-center">
        <Link to="/">
          <img className="w-24 rounded-lg h-24" src={logo} alt="" />
        </Link>
      </div>

      <form onSubmit={handleRegistration} className="mt-6">
        <div>
          <label htmlFor="userName" className="block text-sm text-gray-800">
            Username
          </label>
          <input
            name="userName"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
          />
        </div>
        <div>
          <label htmlFor="emailAdress" className="block text-sm text-gray-800">
            Email
          </label>
          <input
            name="emailAdress"
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm text-gray-800">
              Password
            </label>
          </div>
          <input
            name="password"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Sign Up
          </button>
        </div>
      </form>

      {registrationError && <p className="text-red-500">{registrationError}</p>}
      {profileUpdateError && <p className="text-red-500">{profileUpdateError}</p>}

      

     

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-gray-700 hover:underline">
          Sigin
        </Link>
      </p>
    </div>
  );
};

export default Signup;

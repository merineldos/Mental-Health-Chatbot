import React from "react";
import { useNavigate } from "react-router-dom";
import loginimage from "./images/login.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleTalkToUs = () => {
    navigate("/questionnaire"); 
  };

  const handleGetHelp = () => {
    navigate("/get-help"); 
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      <nav className="fixed top-0 left-0 w-full bg-white py-4 px-8 flex justify-between items-center z-50 shadow-none">
        <div className="text-2xl font-bold text-blue-600">Mindful</div>
        <div className="flex gap-8">
          <button
            onClick={() => navigate("/about")}
            className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate("/emergency")}
            className="text-gray-700 font-medium hover:text-red-500 transition duration-300"
          >
            Emergency Numbers
          </button>
        </div>
      </nav>

      <div className="w-1/2 flex flex-col justify-center items-center text-center px-10">
        <h1 className="text-6xl font-bold text-gray-800">Mindful</h1>
        <p className="text-lg text-gray-600 mt-2">We're there for you</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleTalkToUs} 
            className="relative py-2 px-8 text-blue-700 text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          >
            Talk to Us
          </button>

          <button
            onClick={handleGetHelp} 
            className="relative py-2 px-8 text-blue-700 text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          >
            Get Help
          </button>
        </div>
      </div>

      <div className="w-1/2">
        <img
          src={loginimage}
          alt="Mindful Support"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

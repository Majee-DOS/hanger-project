import React from "react";
import "./LoginView.css";
import Logo from "../images/Hanger.svg";

interface RegisterProps {
  showRegistration: () => void;
  toggleLoggedIn: () => void;
}
const LoginView: React.FC<RegisterProps> = ({
  showRegistration,
  toggleLoggedIn,
}) => {
  const handleLogin = () => {
    toggleLoggedIn();
  };

  return (
    <div className="view">
      <div className="flex justify-center items-center pt-24 pb-30">
        <div className="login-box border border-black flex flex-col items-center justify-between">
          <h1 className="mt-10 text-6xl">Welcome</h1>
          <img src={Logo} className="w-72 h-72 z-0 absolute mt-20" />
          <div className=" flex flex-col mb-20">
            <label>
              <p>Please Login:</p>
            </label>
            <div className="flex flex-row mt-10 w-96 ">
              <label> User Name:</label>
              <input
                type="text"
                className="border border-black rounded-lg ml-5"
              />
            </div>
            <div className="flex flex-row mt-5 w-96">
              <label>Password:</label>
              <input
                type="password"
                className="border border-black rounded-lg ml-8"
              />
            </div>
            <a
              className=" rounded-lg mt-5 bg-amber-900 text-white text-center"
              onClick={handleLogin}
            >
              Login
            </a>
            <p>
              Dont have an account? Register{" "}
              <a onClick={showRegistration}>here 🎯</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";


// import LoginView from "./components/LoginView"
import MainPage from "./components/MainPage";

const App: React.FC = () => {
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };
  // return <div className="App">{loggedIn ? <MainPage /> : <LoginView />}</div>;
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      
    </Routes>
  );
};

export default App;

import "./App.css";
import React, { useState } from "react";

import LoginView from "./components/LoginView";

// import LoginView from "./components/LoginView"
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";



const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };
  return <div>{loggedIn ? <MainPage /> : <LoginView />}</div>;

  //   <Routes>
  //     <Route path="/" element={<MainPage />} />

  //   </Routes>
  // );

  // return <MainPage></MainPage>;
};

export default App;

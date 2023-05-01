import "./App.css";
import React, { useState } from "react";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./components/LoginView";

const App: React.FC = () => {
  const [component, setComponent] = useState(true);
  const [searchText, setSearchText] = useState("")


  const toggleComponent = () => {
    setComponent(!component);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={
          <>
            {component ? (
              <MainPage toggleComponent={toggleComponent} searchText={searchText} setSearchText={setSearchText} />
            ) : (
              <Profile toggleComponent={toggleComponent} setSearchText={setSearchText} />
            )};
          </>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

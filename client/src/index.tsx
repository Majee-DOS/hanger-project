import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import LoginView from "./components/LoginView";
import Sellitem from "./components/Sellitem";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <MainPage />,
  },
  // {
  //   path: "/login",
  //   element: <LoginView />,
  // },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/addItem",
    element: <Sellitem />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

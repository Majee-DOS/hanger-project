import React from "react";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar";
import "./MainPage.css";
import Logo from "../images/Hanger.png";
import { Button, Modal, Drawer, Select, Space } from "antd";
import { useState, useEffect } from "react";
import Register from "./Register";
import LoginView from "./LoginView";
import Sellitem from "./Sellitem";
import { displayAllItems } from "../apiService";
import Item from "./Item";

const { Option } = Select;

const MainPage: React.FC = () => {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([])

useEffect(() => {
  displayAllItems().then(data => [
    setItems(data)
  ])
}, [])
  function showRegistration() {
    setIsRegOpen(!isRegOpen);
  }

  const toggleLoggedIn = () => {
     setIsLoginOpen(false);
  }
  const handleCancel = () => {
    setIsRegOpen(false);
    setIsLoginOpen(false);
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
const handleDisplayAll = () => {
  displayAllItems()
}

  return (
    <div className="main-view">
      <NavBar />
      <FilterBar />

      <div className="Hero">
        <div className="flex justify-around">
          <div className="border-2 border-amber-900 rounded-lg bg-white w-96 h-56 ml-12 mt-12 flex flex-col">
            <h1 className="text-3xl p-4 text-center">
              Earn cash for clothes you're not wearing anymore!!
            </h1>
            <a
              onClick={showDrawer}
              className="ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mt-3"
            >
              Sell now!
            </a>
          </div>
          <img src={Logo} className="" />
        </div>
      </div>
      <div className="custom-shape-divider-top-1681980216">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h2 className="text-3xl ">Main page content</h2>
    <button onClick={handleDisplayAll}>load Images</button>
    <div>
      {items.map(item => <Item key={item.id} item={item}/>)}
    </div>
      <Modal
        width={"1000px"}
        open={isRegOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Register
          toggleLoggedIn={toggleLoggedIn}
          showRegistration={showRegistration}
        />
      </Modal>
      <>
        <Modal
          width={"800px"}
          open={isLoginOpen}
          onCancel={handleCancel}
          footer={false}
        >
          <LoginView
            showRegistration={showRegistration}
            toggleLoggedIn={toggleLoggedIn}
          />
        </Modal>
      </>

      <Drawer
        title="Add Item"
        width={520}
        onClose={handleCancel}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        }
      >
        <Sellitem />
      </Drawer>
    </div>
  );
};

export default MainPage;

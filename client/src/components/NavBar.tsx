import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Hanger.png";
import { Button, Drawer, Space } from "antd";
import { useState } from "react";
import FilterBar from "./FilterBar";
import type { DrawerProps } from "antd";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
 

  return (
    <div className="flex justify-between bg-white">
      <a href="/home">
        <img src={Logo} className="w-24 h-24 ml-8" />
      </a>
      {/* image here */}
      <form className="ml-14">
        <input
          type="text"
          className="px-96 py-4 m-2 mt-4 rounded-full form-input ring-2 ring-amber-900"
        />
        <button className="p-2 ring-2 ring-amber-900 bg-amber-900 text-white rounded-md">
          Search
        </button>
      </form>
      {/* searchBar here */}
      <div className="m-2 flex">
        <a href="/profile">
          <FontAwesomeIcon
            icon={faUserAstronaut}
            className="userIcon p-4 mt-2 mr-9 text-2xl"
          />
        </a>

        {/* profile img here  */}
        <FontAwesomeIcon
          icon={faCommentDollar}
          className="notification p-4 mt-2 mr-9 text-2xl "
        />
        {/* notification icon here
      (with state if new message)  */}
      </div>
      <a
        href="/addItem"
        className="ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mr-12"
      >
        Sell Now
      </a>
      {/*  sell button here */}
     
    </div>
  );
};

export default NavBar;

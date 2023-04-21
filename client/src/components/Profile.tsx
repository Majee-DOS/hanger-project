import React from "react";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css"
import { Button } from "@material-tailwind/react";

const Profile: React.FC = () => {
  return (
    <div className="profile-view">
      <NavBar />
      <FilterBar />
      <div className=" flex m-16">
        <FontAwesomeIcon
          icon={faUserAstronaut}
          className="userIcon bg-orange-50 shadow-2xl m-24 mr-20 p-12 mt-2 mr-9 text-9xl text-slate-300 rounded-full"
        />
        <div className="w-2/5 rounded-2xl shadow-2xl bg-orange-50 relative">
          <h1 className="text-3xl p-10">ThriftOrganic</h1>
          <div className="flex justify-start ">
            <div>
              <ul className="mr-40 ml-10">
                <li>Amanda</li>
                <li>email</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Address:</li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <Button className="mt-6 bg-green-900 absolute right-10 top-5">Add Details</Button>
          </div>
        </div>
      </div>
      <div className="border w-4/5 ml-40">
      </div>
        <h1 className="pl-28 pt-5">Your Warderobe</h1>

    </div>
  );
};

export default Profile;

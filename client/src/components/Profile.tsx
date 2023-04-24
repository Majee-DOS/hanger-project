import React from "react";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { Button, Drawer, Space } from "antd";
import { getProfile, addAddress } from "../apiService";
import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";

const Profile: React.FC = () => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);
  const [houseNo, setHouseNo] = useState(null);
  const [streetName, setStreetName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    renderProfile();
  }, []);

  const userId = localStorage.getItem("userId");

  const handleCancel = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const handleUpdate = async () => {
    const data = {
      houseNo: houseNo,
      streetName: streetName,
      postCode: postCode,
      city: city,
    }
    console.log(data)
    const user = await addAddress(data, userId);
    setHouseNo(user.houseNo);
    setStreetName(user.streetName);
    setPostCode(user.postCode);
    setCity(user.city);
  };

  async function renderProfile() {
    const user = await getProfile(userId);
    setUserName(user.userName);
    setUserEmail(user.email);
    setName(user.name);
    setOpen(false)
  }

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
          <h1 className="text-3xl p-10">{userName}</h1>
          <div className="flex justify-start ">
            <div>
              <ul className="mr-40 ml-10">
                <li>{name}</li>
                <li>{userEmail}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Address:</li>
                <li>{houseNo}</li>
                <li>{streetName}</li>
                <li>{postCode}</li>
                <li>{city}</li>
              </ul>
            </div>
            <div
              className="mt-6 p-2 text-white bg-green-900 absolute right-10 top-5 hover:cursor-pointer"
              onClick={showDrawer}
            >
              Add Details
            </div>
          </div>
        </div>
      </div>
      <div className="border w-4/5 ml-40"></div>
      <h1 className="pl-28 pt-5">Your Warderobe</h1>
      <Drawer
        title="Add Address"
        width={320}
        onClose={handleCancel}
        open={open}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        }
      >
        <form className="mt-10 flex mb-10">
          <div className="flex flex-col mr-10 gap-6">
            <Input
              value={houseNo}
              type="number"
              label="House Number"
              className="bg-white"
              onChange={(e) => setHouseNo(e.target.value)}
            />
            <Input
              value={streetName}
              label="Street"
              className="bg-white"
              onChange={(e) => setStreetName(e.target.value)}
            />
            <Input
              value={postCode}
              label="Post code"
              className="bg-white"
              onChange={(e) => setPostCode(e.target.value)}
            />
            <Input
              value={city}
              label="City"
              className="bg-white"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>
        <Button className=" bg-green-900  text-white" onClick={handleUpdate}>
          Update
        </Button>
      </Drawer>
    </div>
  );
};

export default Profile;

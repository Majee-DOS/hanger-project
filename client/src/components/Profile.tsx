import React from 'react';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import { Button, Drawer, Space } from 'antd';
import { AddAddressFunction } from '../apiService';
import { useEffect, useState } from 'react';
import { Input } from '@material-tailwind/react';
import { GetUserItemsFunction } from '../apiService';
import SellitemProfile from '../components/SellItemProfile';
import ItemProfile from '../components/ItemProfile';

interface Props {
  toggleComponent: () => void;
  setSearchText: any;
}

const Profile: React.FC<Props> = ({ toggleComponent, setSearchText }) => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);
  const [houseNo, setHouseNo] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [postCode, setPostCode] = useState('');
  const [city, setCity] = useState('');
  const [items, setItems] = useState([]);
  const [drawerAddress, setDrawerAddress] = useState(false);

  // const [user, setUser] = useState({
  //   name: null,
  //   email: null,
  // });
  // const staticUser = {};

  useEffect(() => {
    // renderProfile();
    renderProfile2();
  }, []);

  const userId = localStorage.getItem('userId');

  const handleCancel = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawerAddress = () => {
    setDrawerAddress(true);
  };

  const handleUpdate = async () => {
    const data = {
      houseNo: houseNo,
      streetName: streetName,
      postCode: postCode,
      city: city,
    };
    const user = await AddAddressFunction(data);
    setHouseNo(user.houseNo);
    setStreetName(user.streetName);
    setPostCode(user.postCode);
    setCity(user.city);
    setDrawerAddress(false);
  };

  // async function renderProfile() {
  //   const user = await getProfile(userId);
  //   setUserName(user.userName);
  //   setUserEmail(user.email);
  //   setName(user.name);
  // }

  const renderProfile2 = () => {
    GetUserItemsFunction().then((data) => {
      const sortedItems = data.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });

      setItems(sortedItems);
    });
  };

  return (
    <div className='profile-view'>
      <NavBar toggleComponent={toggleComponent} setSearchText={setSearchText} />
      <div className=' flex p-24'>
        <FontAwesomeIcon
          icon={faUserAstronaut}
          // className='userIcon bg-orange-50 shadow-2xl m-24 mr-20 p-12 mt-2 mr-9 text-9xl text-slate-300 rounded-full'
        />
        <div className='w-2/5 rounded-2xl shadow-2xl bg-orange-50 relative ml-20'>
          <h1 className='text-3xl p-10 font-bold'>{userName}</h1>
          <div className='flex justify-start '>
            <div>
              <ul className='mr-20 ml-10 mt-5'>
                <li>{name}</li>
                <li>{userEmail}</li>
              </ul>
            </div>
            <div>
              <ul className='flex flex-col w-40'>
                <li className='font-bold'>Address:</li>
                <li className=' flex justify-between'>
                  House No: <span>{houseNo}</span>
                </li>
                <li className='flex justify-between'>
                  Street: <span>{streetName}</span>
                </li>
                <li className='flex justify-between'>
                  Post Code:<span>{postCode}</span>{' '}
                </li>
                <li className='flex justify-between'>
                  City:<span>{city}</span>
                </li>
              </ul>
            </div>
            <div
              className='mt-6 p-2 text-white bg-green-900 absolute rounded-lg right-10 top-5 hover:cursor-pointer'
              onClick={showDrawerAddress}
            >
              Add Details
            </div>
          </div>
        </div>
      </div>
      <div className='border w-4/5 ml-40'></div>
      <div className='flex'>
        <h1 className='ml-28 mt-5 '>Your Warderobe</h1>{' '}
        <button
          className='ml-5 mt-4 ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mr-12 hover:cursor-pointer'
          onClick={showDrawer}
        >
          Add
        </button>
      </div>
      <div className='flex ml-6 mr-6 overflow-auto'>
        {items.map((item) => (
          <ItemProfile key={item._id} item={item} />
        ))}
      </div>
      <Drawer
        title='Add Address'
        width={320}
        onClose={handleCancel}
        open={drawerAddress}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        }
      >
        <form className='mt-10 flex mb-10'>
          <div className='flex flex-col mr-10 gap-6'>
            <Input
              value={houseNo}
              type='number'
              label='House Number'
              className='bg-white'
              onChange={(e) => setHouseNo(e.target.value)}
            />
            <Input
              value={streetName}
              label='Street'
              className='bg-white'
              onChange={(e) => setStreetName(e.target.value)}
            />
            <Input
              value={postCode}
              label='Post code'
              className='bg-white'
              onChange={(e) => setPostCode(e.target.value)}
            />
            <Input
              value={city}
              label='City'
              className='bg-white'
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>
        <Button className=' bg-green-900  text-white' onClick={handleUpdate}>
          Update
        </Button>
      </Drawer>
      <Drawer
        title='Add Item'
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
        <SellitemProfile renderProfile2={renderProfile2} />
      </Drawer>
    </div>
  );
};

export default Profile;

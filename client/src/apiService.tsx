import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { RegisterInterface } from './interfaces/register';
import { LoginInterface } from './interfaces/login';
import { AddressInterface } from './interfaces/address';
import { ItemInterface } from './interfaces/item';
import { ImageInterface } from './interfaces/image';

const rootURL = 'http://localhost:3020';

type NavigateFunction = (path: string, state?: any) => void;

interface RegistrationError {
  message: string;
}

export const RegisterFunction = async (
  value: RegisterInterface,
  navigate: NavigateFunction
) => {
  try {
    await axios.post(`${rootURL}/register`, value);
    message.success('Registered successfully! Redirecting to login.');
    navigate('/login');
  } catch (error) {
    const axiosError = error as AxiosError<RegistrationError>;
    if (
      axiosError.response &&
      axiosError.response.data.message === 'Email already in use'
    ) {
      message.error(
        'E-mail already in use, please try a different e-mail address'
      );
    } else {
      message.error('Registration unsuccessful, try again later');
    }
  }
};

export const LoginFunction = async (
  value: LoginInterface,
  navigate: NavigateFunction
) => {
  try {
    const result = await axios.post(`${rootURL}/login`, value);
    if (result.data.success) {
      localStorage.setItem('hanger-user', JSON.stringify(result.data.user));
      localStorage.setItem('hanger-token', JSON.stringify(result.data.token));
      message.success('Logged in successfully!');
      navigate('/');
    } else {
      message.error(
        'Login failed, check your e-mail or password and try again!'
      );
    }
  } catch (error) {
    message.error('Login failed, check your e-mail or password and try again!');
  }
};

export const AddAddressFunction = async (value: AddressInterface) => {
  try {
    const token = localStorage.getItem('hanger-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.post(`${rootURL}/add-address`, value, {
      headers,
    });
    message.success('You have added a address');
    return result.data;
  } catch (error) {
    message.error('Users can only have one address');
  }
};

export const UpdateAddressFunction = async (value: AddressInterface) => {
  try {
    const token = localStorage.getItem('hanger-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.put(
      `${rootURL}/update-address/${value._id}`,
      value,
      {
        headers,
      }
    );
    message.success('You have updated your address');
    return result;
  } catch (error) {
    message.error('Your address could not be updated, please try again later');
  }
};

export const PostItemFunction = async (value: ItemInterface) => {
  try {
    const token = localStorage.getItem('hanger-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const result = await axios.post(`${rootURL}/add-item`, value, { headers });
    message.success('Item added successfully!');
    return result.data;
  } catch (error) {
    message.error('Item could not be added, please try again later');
  }
};

// export const AllListedItemsFunction= async ()

// TODO: Function to handle image during Item Creation
// TODO: Learn how to implement cloudinary on Monday
export const SendImageFunction = async () => {};

export const EditItemFunction = async (val: ItemInterface) => {
  try {
    const token = localStorage.getItem('hanger-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.put(`${rootURL}/update-item/${val._id}`, val, {
      headers,
    });
    message.success('Item updated successfully!');
    return result.data;
  } catch (error) {
    message.error('Item could not be updated, please try again later');
  }
};

// Get Items specified by user
export const GetUserItemsFunction = async () => {
  try {
    const token = localStorage.getItem('hanger-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //retreive user data from local storage and parse to get the user id
    const userData = JSON.parse(localStorage.getItem('hanger-user'));
    const result = await axios.get(`${rootURL}/user-items/${userData._id}`, {
      headers,
    });
    return result.data;
  } catch (error) {
    message.error('User items could not be retrieved, please try again later');
  }
};

// Get All Items does not require autherization
export const GetAllItemsFunction = async () => {
  try {
    const result = await axios.get(`${rootURL}/get-Items`);
    return result.data;
  } catch (error) {
    message.error('Items could not be retrieved, please try again later');
  }
};

// TODO: Figure out how the item id should be passed
// either from the url or from the local storage
export const DeleteItemFunction = async (itemId: string) => {
  try {
    const token = localStorage.getItem('hanger-token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //this id should be the item id not the user id
    const result = await axios.delete(`${rootURL}/delete-item/${itemId}`, {
      headers,
    });
    message.success('Item deleted successfully!');
    return result.data;
  } catch (error) {
    message.error('Item could not be deleted, please try again later');
  }
};

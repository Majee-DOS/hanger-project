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
    const result = await axios.put(`${rootURL}/add-address`, value, {
      headers,
    });
    message.success('You have updated your address');
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

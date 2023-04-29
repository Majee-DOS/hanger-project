import app from '../index';
import supertest from 'supertest';
import { deleteOne } from '../models/userModel';
import { deleteAddress } from '../models/addressModel';
import { MongooseError } from 'mongoose';

let userId: string;
let addressId: string;
let token: string;

describe('registration', () => {
  it('should register a user', async () => {
    const res = await supertest.agent(app).post('/register').send({
      name: 'test1',
      email: 'test@mail1',
      userName: 'testUser1',
      password: 'testPass1',
    });
    // console.log('Registration response:', res.body);
    expect(res.status).toBe(201);
    userId = res.body._id;
  });

  it('should not register a user if the email is in use', async () => {
    const res = await supertest.agent(app).post('/register').send({
      name: 'test2',
      email: 'test@mail1',
      userName: 'testUser2',
      password: 'testPass2',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Email already in use');
  });
});

describe('login', () => {
  it('should allow a user to log in with the registered email and password', async () => {
    const res = await supertest.agent(app).post('/login').send({
      email: 'test@mail1',
      password: 'testPass1',
    });
    // console.log('Login response:', res.body);
    expect(res.status).toBe(200);
    token = res.body.token;
  });

  it('should not allow a user to log in if e-mail or password is incorrect', async () => {
    const res = await supertest.agent(app).post('/login').send({
      email: 'test@mail2',
      password: 'testPass2',
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Login failed');
    expect(res.body.success).toBe(false);
  });
});

describe('address', () => {
  it('should allow a logged in user to add a address to their account', async () => {
    const res = await supertest
      .agent(app)
      .post('/add-address')
      .set('Authorization', `Bearer ${token}`)
      .send({
        houseNo: 123,
        streetName: 'test street',
        postCode: 'test postcode',
        city: 'test city',
      });
    // console.log('address response:', res.body);
    expect(res.status).toBe(201);
    addressId = res.body._id;
  });

  it('should NOT allow the same user to add another address to their account', async () => {
    const res = await supertest
      .agent(app)
      .post('/add-address')
      .set('Authorization', `Bearer ${token}`)
      .send({
        houseNo: 123,
        streetName: 'test street',
        postCode: 'test postcode',
        city: 'test city',
        user: userId,
      });
    console.log('address response adding another address:', res.body.status);
    expect(res.body.message).toEqual(
      expect.stringContaining('E11000 duplicate key error')
    );
  });
  it('should allow a logged in user to edit their address', async () => {
    const res = await supertest
      .agent(app)
      .put(`/update-address/${addressId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        houseNo: 1234,
        streetName: 'test street2',
        postCode: 'test postcode2',
        city: 'test city2',
      });
    // console.log('update address response:', addressId);
    expect(res.status).toBe(201);
  });
});

afterAll(async () => {
  // console.log('Deleting user data for user ID:', userId);
  await deleteOne(userId);
  await deleteAddress(addressId);
  // console.log('Result of deleteOne:', result);
});

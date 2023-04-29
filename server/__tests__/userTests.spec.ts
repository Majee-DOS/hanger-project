import app from '../index';
import supertest from 'supertest';
import { deleteOne } from '../models/userModel';

let userId: string;

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

  it('should register a user', async () => {
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

afterAll(async () => {
  // console.log('Deleting user data for user ID:', userId);
  const result = await deleteOne(userId);
  // console.log('Result of deleteOne:', result);
});

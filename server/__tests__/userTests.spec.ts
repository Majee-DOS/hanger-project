// import app from '../index';
// import supertest from 'supertest';
// import { deleteOne } from '../models/userModel';

// let userId: string;

// describe('registration', () => {
//   it('should register a user', async () => {
//     const res = await supertest.agent(app).post('/register').send({
//       name: 'test1',
//       email: 'test@mail1',
//       userName: 'testUser1',
//       password: 'testPass1',
//     });
//     // console.log('Registration response:', res.body);
//     expect(res.status).toBe(201);
//     userId = res.body._id;
//   });

//   it('should not register a user if the email is in use', async () => {
//     const res = await supertest.agent(app).post('/register').send({
//       name: 'test2',
//       email: 'test@mail1',
//       userName: 'testUser2',
//       password: 'testPass2',
//     });
//     expect(res.status).toBe(400);
//     expect(res.body.message).toBe('Email already in use');
//   });

//   it('should allow a user to log in with the registered email and password', async () => {
//     const res = await supertest.agent(app).post('/login').send({
//       email: 'test@mail1',
//       password: 'testPass1',
//     });
//     expect(res.status).toBe(200);
//   });

//   it('should not allow a user to log in if e-mail or password is incorrect', async () => {
//     const res = await supertest.agent(app).post('/login').send({
//       email: 'test@mail2',
//       password: 'testPass2',
//     });
//     expect(res.status).toBe(400);
//     expect(res.body.error).toBe('Login failed');
//     expect(res.body.success).toBe(false);
//   });
// });

// afterAll(async () => {
//   // console.log('Deleting user data for user ID:', userId);
//   const result = await deleteOne(userId);
//   // console.log('Result of deleteOne:', result);
// });

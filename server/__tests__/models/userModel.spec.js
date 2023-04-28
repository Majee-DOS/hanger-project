"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// __tests__/user.test.ts
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const server = (0, supertest_1.default)(app_1.callback);
describe('User Controller', () => {
    describe('loginUser', () => {
        const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
            return server.post('/login').send({ email, password });
        });
        it('should log in a user with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            // You should create a test user with known credentials before running this test
            const email = 'test@test.com';
            const password = 'test123';
            const response = yield loginUser(email, password);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty('token');
        }));
        it('should fail to log in a user with incorrect credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const email = 'test@test.com';
            const password = 'wrongpassword';
            const response = yield loginUser(email, password);
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        }));
    });
    describe('registerUser', () => {
        const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
            return server.post('/register').send(user);
        });
        it('should register a new user with unique email', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = {
                name: 'New User',
                email: 'newuser@test.com',
                userName: 'newuser',
                password: 'newuser123',
            };
            const response = yield registerUser(newUser);
            expect(response.status).toBe(201);
            // Add additional assertions to check other properties in the response body as needed
            expect(response.body.name).toBe(newUser.name);
        }));
        it('should fail to register a user with an existing email', () => __awaiter(void 0, void 0, void 0, function* () {
            const existingUser = {
                name: 'Existing User',
                email: 'test@test.com',
                userName: 'existinguser',
                password: 'existinguser123',
            };
            const response = yield registerUser(existingUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Email already in use');
        }));
    });
});

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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const userModel_1 = require("../models/userModel");
let userId;
describe('registration', () => {
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).post('/register').send({
            name: 'test1',
            email: 'test@mail1',
            userName: 'testUser1',
            password: 'testPass1',
        });
        // console.log('Registration response:', res.body);
        expect(res.status).toBe(201);
        userId = res.body._id;
    }));
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).post('/register').send({
            name: 'test2',
            email: 'test@mail1',
            userName: 'testUser2',
            password: 'testPass2',
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Email already in use');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Deleting user data for user ID:', userId);
    const result = yield (0, userModel_1.deleteOne)(userId);
    // console.log('Result of deleteOne:', result);
}));

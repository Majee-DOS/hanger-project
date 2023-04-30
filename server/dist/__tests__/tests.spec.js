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
const addressModel_1 = require("../models/addressModel");
const itemsModel_1 = require("../models/itemsModel");
let userId;
let addressId;
let token;
let itemId;
//comment delete
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
    it('should not register a user if the email is in use', () => __awaiter(void 0, void 0, void 0, function* () {
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
describe('login', () => {
    it('should allow a user to log in with the registered email and password', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).post('/login').send({
            email: 'test@mail1',
            password: 'testPass1',
        });
        // console.log('Login response:', res.body);
        expect(res.status).toBe(200);
        token = res.body.token;
    }));
    it('should not allow a user to log in if e-mail or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).post('/login').send({
            email: 'test@mail2',
            password: 'testPass2',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Login failed');
        expect(res.body.success).toBe(false);
    }));
});
describe('address', () => {
    it('should allow a logged in user to add a address to their account', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
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
    }));
    it('should NOT allow the same user to add another address to their account', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
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
        expect(res.body.message).toEqual(expect.stringContaining('E11000 duplicate key error'));
    }));
    it('should allow a logged in user to edit their address', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
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
    }));
});
describe('Item Testing', () => {
    it('should add an item', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
            .post('/add-Item')
            .set('Authorization', `Bearer ${token}`)
            .send({
            title: 'test1',
            desc: 'test1',
            category: 'test1',
            condition: 'test1',
            price: 100,
            size: 'test1',
            img: 'test1',
        });
        expect(res.status).toBe(201);
        itemId = res.body._id;
    }));
    it('should edit an item ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
            .put(`/update-item/${itemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            price: 9999,
        });
        expect(res.status).toBe(200);
    }));
    it('should get all the items specific to a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
            .get(`/user-items/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it('should get all the items', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).get('/get-Items');
        expect(res.status).toBe(200);
    }));
    it('should delete an item', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).delete(`/delete-item/${itemId}`);
        expect(res.status).toBe(201);
    }));
    it('should not add an item without authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).post('/add-Item').send({
            title: 'test1',
            desc: 'test1',
            category: 'test1',
            condition: 'test1',
            price: 100,
            size: 'test1',
            img: 'test1',
        });
        expect(res.status).toBe(403);
    }));
    it('should not edit an item with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
            .put('/update-item/invalidID')
            .set('Authorization', `Bearer ${token}`)
            .send({
            price: 9999,
        });
        expect(res.status).toBe(404);
    }));
    it('should not get items specific to an invalid user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default
            .agent(index_1.default)
            .get('/user-items/invalidID')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(404);
    }));
    it('should not delete an invalid item', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).delete('/delete-item/invalidID');
        expect(res.status).toBe(403);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('Deleting user data for user ID:', userId);
        yield (0, userModel_1.deleteOne)(userId);
        yield (0, addressModel_1.deleteAddress)(addressId);
        yield (0, itemsModel_1.deleteItem)(itemId);
        // console.log('Result of deleteOne:', result);
    }));
});

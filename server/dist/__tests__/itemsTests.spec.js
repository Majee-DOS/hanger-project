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
// { getAll, getItemsByUserId, addItemToUser, editItem, deleteItem,}
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
describe('addItem', () => {
    it('should add an item', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default.agent(index_1.default).post('/addItem').send({
            title: 'test1',
            desc: 'test1',
            category: 'test1',
            condition: 'test1',
            price: 1,
            size: 'test1',
            img: 'test1',
            user: 'test1',
        });
        expect(res.status).toBe(201);
    }));
});

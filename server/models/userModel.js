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
exports.getUserById = exports.emailExists = exports.getUserByEmail = exports.createUser = void 0;
const antd_1 = require("antd");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userData = new db_1.mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});
const User = db_1.mongoose.model('userData', userData);
//could be registration operation
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    const newUser = new User(Object.assign(Object.assign({}, user), { password: hashedPassword }));
    return newUser.save();
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return User.findOne({ email });
});
exports.getUserByEmail = getUserByEmail;
//Need to explicitly cast the result of  User.exists({ email }) to a boolean type
/* This ensures that the function always returns a boolean value, regardless of the actual value returned by User.exists.
The Boolean() function converts any truthy value to true and any falsy value (including null and undefined) to false. */
const emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = User.exists({ email });
    return Boolean(result);
});
exports.emailExists = emailExists;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = User.findOne({ _id: userId });
    return String(antd_1.Result);
});
exports.getUserById = getUserById;

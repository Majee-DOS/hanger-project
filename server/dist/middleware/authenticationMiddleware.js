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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY || 'dawgy this aint safe at aawwwll';
const authMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = ctx.headers['authorization'];
    if (!authHeaders) {
        ctx.status = 403;
        return next();
    }
    const token = authHeaders.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, SECRET_KEY);
        const user = yield User.getUserById(_id);
        if (!user) {
            ctx.status = 401;
            return;
        }
        ctx.state.user = user;
        return next();
    }
    catch (error) {
        ctx.status = 401;
        ctx.error = error;
        return next();
    }
});
exports.default = authMiddleware;

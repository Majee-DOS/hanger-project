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
exports.updateAddress = exports.registerAddress = void 0;
const addressModel_1 = require("../models/addressModel");
const registerAddress = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(ctx.state);
    try {
        const results = yield (0, addressModel_1.addUserAddress)(ctx.request.body, ctx.state.user._id);
        ctx.status = 201;
        ctx.body = results;
        // console.log(results);
    }
    catch (error) {
        throw error;
    }
});
exports.registerAddress = registerAddress;
const updateAddress = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(ctx.request.params.id);
        const { id: addressId } = ctx.request.params;
        const updatedAddress = ctx.request.body;
        const result = yield (0, addressModel_1.updateAddress)(addressId, updatedAddress);
        ctx.status = 201;
        ctx.body = result;
        yield next();
    }
    catch (error) {
        throw error;
    }
});
exports.updateAddress = updateAddress;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserItems = exports.getAllItems = exports.deleteItem = exports.editItem = exports.addItem = void 0;
const model = __importStar(require("../models/itemsModel"));
const addItem = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('ITEMINFO:', ctx.request.body);
        // console.log('userId:', ctx.state.user._id);
        const requestBody = ctx.request.body;
        const result = yield model.addItemToUser(requestBody, ctx.state.user._id);
        // console.log('result:', result);
        ctx.status = 201;
        ctx.body = result;
        yield next();
    }
    catch (error) {
        throw error;
    }
});
exports.addItem = addItem;
const editItem = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(ctx.request.body);
        const updatedItem = ctx.request.body;
        const { id: itemId } = ctx.params;
        const result = yield model.editItem(itemId, updatedItem);
        ctx.status = 200;
        ctx.body = result;
        yield next();
    }
    catch (error) {
        throw error;
    }
});
exports.editItem = editItem;
const deleteItem = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model.deleteItem(ctx.params.id);
        ctx.status = 201;
        ctx.body = result;
        yield next();
    }
    catch (error) {
        throw error;
    }
});
exports.deleteItem = deleteItem;
const getAllItems = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model.getAll();
        ctx.status = 200;
        ctx.body = result;
        yield next();
    }
    catch (error) {
        throw error;
    }
});
exports.getAllItems = getAllItems;
const getUserItems = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(ctx.request.params);
        //const requestParams = ctx.request.params as { id: string };
        const result = yield model.getItemsByUserId(ctx.params.id);
        ctx.status = 200;
        ctx.body = result;
        yield next();
    }
    catch (error) {
        throw error;
    }
});
exports.getUserItems = getUserItems;

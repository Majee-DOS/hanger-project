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
exports.deleteItem = exports.editItem = exports.addItemToUser = exports.getItemsByUserId = exports.getAll = void 0;
const db_1 = require("../db");
const itemData = new db_1.mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    img: { type: String, required: true },
    user: {
        type: db_1.mongoose.Schema.Types.ObjectId,
        ref: 'userData',
    },
});
const Item = db_1.mongoose.model('itemData', itemData);
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allItems = yield Item.find();
    return allItems;
});
exports.getAll = getAll;
const getItemsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Item.find({ user: userId });
    return data;
});
exports.getItemsByUserId = getItemsByUserId;
//(itemInfo, userId, next) next is declared but never used so I removed it
const addItemToUser = (itemInfo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new Item(Object.assign(Object.assign({}, itemInfo), { user: userId }));
    return yield newItem.save();
});
exports.addItemToUser = addItemToUser;
const editItem = (itemId, updatedItemData) => {
    const options = { new: true };
    //editing user _id
    return Item.findOneAndUpdate({ _id: itemId }, { $set: updatedItemData }, options);
};
exports.editItem = editItem;
const deleteItem = (itemId) => {
    return Item.findByIdAndDelete(itemId);
};
exports.deleteItem = deleteItem;

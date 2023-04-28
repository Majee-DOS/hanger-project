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
exports.updateAddress = exports.addUserAddress = void 0;
const db_1 = require("../db");
const userAddress = new db_1.mongoose.Schema({
    houseNo: { type: Number, required: true },
    streetName: { type: String, required: true },
    postCode: { type: String, required: true },
    city: { type: String, required: true },
    user: {
        type: db_1.mongoose.Schema.Types.ObjectId,
        ref: 'userData',
        unique: true,
        sparse: true,
    },
});
const UserAddress = db_1.mongoose.model('address', userAddress);
//name before was updateAddress, changed it to addUserAddress, because the operation below is a 'create' operation, and not a 'find and update' operation for mongoose backend
const addUserAddress = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new UserAddress(Object.assign(Object.assign({}, data), { user: userId }));
    return newUser.save();
});
exports.addUserAddress = addUserAddress;
const updateAddress = (addressId, updatedAddress) => {
    const options = { new: true };
    //editing user _id
    return UserAddress.findOneAndUpdate({ _id: addressId }, { $set: updatedAddress }, options);
};
exports.updateAddress = updateAddress;

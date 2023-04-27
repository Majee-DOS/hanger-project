const mongoose = require('../db');

const userAddress = new mongoose.Schema({
  houseNo: { type: Number, required: true },
  streetName: { type: String, required: true },
  postCode: { type: String, required: true },
  city: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userData',
  },
});

const UserAddress = mongoose.model('address', userAddress);
//name before was updateAddress, changed it to addUserAddress, because the operation below is a 'create' operation, and not a 'find and update' operation for mongoose backend

const addUserAddress = async (data, userId) => {
  const newUser = await new UserAddress({ ...data, user: userId });
  return newUser.save();
};

const updateAddress = (addressId, updatedAddress) => {
  const options = { new: true };
  //editing user _id
  return userAddress.findOneAndUpdate(
    { _id: addressId },
    { $set: updatedAddress },
    options
  );
};

module.exports = { addUserAddress, updateAddress };

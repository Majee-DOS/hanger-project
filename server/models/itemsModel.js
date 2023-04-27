const mongoose = require('../db');

const itemData = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  img: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userData',
  },
});

const Item = mongoose.model('itemData', itemData);

const getAll = async () => {
  const allItems = await Item.find();
  return allItems;
};

const getItemsByUserId = async (userId) => {
  const data = await Item.find({ user: userId });
  return data;
};

const addItemToUser = async (itemInfo, userId, next) => {
  const newItem = new Item({ ...itemInfo, user: userId });
  return await newItem.save();
};

const editItem = (itemId, updatedItemData) => {
  const options = { new: true };
  //editing user _id
  return Item.findOneAndUpdate(
    { _id: itemId },
    { $set: updatedItemData },
    options
  );
};

const deleteItem = (itemId) => {
  return Item.findByIdAndDelete(itemId);
};

module.exports = {
  getAll,
  getItemsByUserId,
  addItemToUser,
  editItem,
  deleteItem,
};

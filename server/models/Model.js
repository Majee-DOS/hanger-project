const { User, Item, UserAddress } = require("../db");

exports.createUser = (user) => {
  const newUser = new User(user);
  newUser.save();
  return newUser;
};

exports.addItem = async (itemData, userId) => {
  const newItem = await new Item({ ...itemData, user: userId });
  return newItem.save();
};

exports.user = async (userId) => {
  const findUser = await User.findOne({ _id: userId });
  return findUser;
};

exports.update = async (data, uderId) => {
  const newUser = await new UserAddress({ ...data, user: uderId });
  return newUser.save();
};

exports.getAll = async () => {
  const allItems = await Item.find();
  return allItems;
};

exports.getMany = async (user) => {
  const data = await Item.find({ user: user });
  return data;
};

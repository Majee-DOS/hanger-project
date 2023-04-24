const {User, Item, UserAddress} = require("../db");


exports.createUser = (user) => {
  const newUser = new User(user);
  newUser.save();
  return newUser;
};

exports.addItem =  async (itemData, userId) => {
 const newItem = await new Item({...itemData, user: userId })
 return newItem.save();


};

exports.user = async(userId) => {
  const findUser = await User.findById(userId);
  return findUser
}

exports.update = async(data, uderId) => {
  // const updatedUser = await User.findByIdAndUpdate({...userId, address: data})
  const newUser = await new UserAddress({...data, user: uderId})
  // return updatedUser
  return newUser.save()
}

exports.getAll = async() => {
  const allItems = await Item.find();
  return allItems;
}
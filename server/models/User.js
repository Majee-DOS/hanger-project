const {User, Item} = require("../db");


exports.createUser = (user) => {
  const newUser = new User(user);
  newUser.save();
  return newUser;
};

exports.addItem = (itemData) => {
 const newItem = new Item(itemData)
// updateWardrobe()
 newItem.save();
 return newItem

};

function updateWardrobe(userId, itemId) {
  User.findByIdAndUpdate(userId, {$push: {warderobe: itemId}})
}
exports.loginUser = async ({ userName, password }) => {
  return User.findOne({ userName, password });
};

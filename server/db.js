const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/HangerDB")
  .then(() => {
    console.log("connected to database! 😎");
  })
  .catch((err) => {
    console.log("try again 😢", err);
  });

const userData = new mongoose.Schema({
  warderobe: { type: mongoose.Schema.Types.ObjectId, ref: "itemData" },
  name: { type: String },
  userName: { type: String },
  password: { type: String },
  email: { type: String },
 
});

const userAddress = new mongoose.Schema({
  houseNo: { type: Number },
  streetName: { type: String },
  postCode: { type: String },
  city: { type: String },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
  },
});

const itemData = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userData" },
  title: { type: String },
  desc: { type: String },
  category: { type: String },
  condition: { type: String },
  price: { type: Number },
  img: { type: String },
});

const User = mongoose.model("userData", userData);
const UserAddress = mongoose.model('address', userAddress)
const Item = mongoose.model("itemData", itemData);

module.exports = {User, Item, UserAddress};

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
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
 
});

const userAddress = new mongoose.Schema({
  houseNo: { type: Number, required: true },
  streetName: { type: String, required: true },
  postCode: { type: String, required: true },
  city: { type: String, required: true },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
  },
});

const itemData = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userData" },
  timestamp: {type: Date, default: Date.now},
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  size: {type: String, required: true},
  img: { type: String, required: true },
});

const User = mongoose.model("userData", userData);
const UserAddress = mongoose.model('address', userAddress)
const Item = mongoose.model("itemData", itemData);

module.exports = {User, Item, UserAddress};

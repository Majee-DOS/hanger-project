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
    firstName: String,
    userName: String,
    password: String,
    address: {
        houseNo: Number,
        streetName: String,
        postCode: String,
        city: String
    }
  })

  const itemData = new mongoose.Schema({
    title: String,
    desc: String,
    category: String,
    brand: String,
    condition: String,
    price: Number,
    img: String
  }) 



  const User = mongoose.model('userData', userData);

  const Item = mongoose.model('itemData', itemData)

  module.exports = {Item, User}
const User = require("./models/User");

exports.create = async (ctx) => {
  try {
    const user = await User.createUser(ctx.request.body);
    console.log(user);
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log("Cant create User");
  }
};

exports.add = async (ctx) => {
  try {
   console.log(ctx.request.body)
    const addItem = await User.addItem(ctx.request.body);
    console.log(addItem)
    ctx.body = addItem;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log("Cant add item");
  }
};

// exports.login = async (ctx) => {
//   try {
//     ctx.status = 200;
//   } catch (error) {
//     ctx.status = 500;
//     console.log("cant create user");
//   }
// };

const Model = require("./models/Model");
// const cloudinery  = require("./utils/cloudinary");
exports.create = async (ctx) => {
  try {
    const user = await Model.createUser(ctx.request.body);
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log("Cant create User");
  }
};

exports.add = async (ctx) => {
  try {
    const userId = ctx.params.id;
    const addItem = await Model.addItem(ctx.request.body, userId);
    ctx.body = addItem;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log("Cant add item");
  }
};

exports.getUser = async (ctx) => {
  try {
    const user = await Model.user(ctx.params.id);
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    console.log("cant get this user");
  }
};
exports.getMine = async (ctx) => {
  try {
    const userId = ctx.params.user
  
    const myItems = await Model.getMany(userId)
    ctx.body = myItems 
    ctx.status = 200
  } catch (error) {
    ctx.status = 500;
    console.log("cant find your wardrobe")
  }
}

exports.updateUser = async (ctx) => {
  try {
    const userId = ctx.params.id;
    const newData = await Model.update(ctx.request.body, userId);
    ctx.body = newData;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log("cant update");
  }
};

exports.getAllItems = async (ctx) => {
  try {
    const allItems = await Model.getAll();
    ctx.body = allItems;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    console.log("cant get all items");
  }
}

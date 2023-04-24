const Model = require("./models/Model");
const cloudinery  = require("./utils/cloudinary");
exports.create = async (ctx) => {
  try {
    const user = await Model.createUser(ctx.request.body);
    console.log(ctx.request.body);
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
    console.log(userId)
    console.log(ctx.request.body)
    const addItem = await Model.addItem(ctx.request.body, userId);
    console.log(addItem);
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

exports.uploadData = async (ctx) => {
  try {
    const imgFile = ctx.request.body;
    const uploadedResponse = await cloudinery.uploader.upload(imgFile, {
      upload_preset: "dev_setups"
    })
    console.log(uploadedResponse)
  } catch (error) {
    ctx.status = 500;
    console.log("cant update data");
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
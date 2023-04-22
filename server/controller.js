const Model = require("./models/Model");

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
    console.log(ctx.request.body);
    console.log(ctx.request.user);
    const addItem = await Model.addItem(ctx.request.body);
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
    console.log(ctx.params.id);
    const user = await Model.user(ctx.params.id);
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    console.log("cant get this user");
  }
};

exports.updateUser = async(ctx) => {
  try {
    const userId = ctx.params.id;
    console.log(ctx.request.body)
    const newData = await Model.update(ctx.request.body, userId)
     console.log(newData);
    ctx.body = newData
    ctx.status = 201
  } catch (error) {
    ctx.status = 500;
    console.log('cant update')
  }
}

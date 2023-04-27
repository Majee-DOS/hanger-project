const model = require('../models/itemsModel');

const addItem = async (ctx, next) => {
  try {
    // console.log('ITEMINFO:', ctx.request.body);
    // console.log('userId:', ctx.state.user._id);
    const result = await model.addItemToUser(
      ctx.request.body,
      ctx.state.user._id
    );
    // console.log('result:', result);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    next(error);
  }
};

const editItem = async (ctx, next) => {
  try {
    // console.log(ctx.request.body);
    const { id: itemId } = ctx.request.params;
    const updatedItem = ctx.request.body;
    const result = await model.editItem(itemId, updatedItem);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    next(error);
  }
};
const deleteItem = async (ctx, next) => {
  try {
    const { id: itemId } = ctx.request.params;
    const result = await model.deleteItem({ _id: itemId });
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    next(error);
  }
};
const getAllItems = async (ctx, next) => {
  try {
    const result = await model.getAll();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    next(error);
  }
};

const getUserItems = async (ctx, next) => {
  try {
    // console.log(ctx.request.params);
    const result = await model.getItemsByUserId(ctx.request.params.id);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    next(error);
  }
};

module.exports = { addItem, editItem, deleteItem, getAllItems, getUserItems };

const model = require('../models/addressModel');

const registerAddress = async (ctx, next) => {
  // console.log(ctx.state);
  try {
    const results = await model.addUserAddress(
      ctx.request.body,
      ctx.state.user._id
    );
    ctx.status = 201;
    ctx.body = results;
    // console.log(results);
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (ctx, next) => {
  try {
    console.log(ctx.request.params.id);
    const { id: addressId } = ctx.request.params;
    const updatedAddress = ctx.request.body;
    const result = await model.updateAddress(addressId, updatedAddress);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    next(error);
  }
};

module.exports = { registerAddress, updateAddress };

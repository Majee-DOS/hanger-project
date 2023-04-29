import { IUserAddress } from '../interfaces/addressInterface';
import {
  addUserAddress,
  updateAddress as updateAddressModel,
} from '../models/addressModel';
import { Context, Next, ParameterizedContext } from 'koa';

const registerAddress = async (ctx: Context, next: Next) => {
  // console.log(ctx.state);
  try {
    const results = await addUserAddress(
      ctx.request.body as IUserAddress,
      ctx.state.user._id
    );
    ctx.status = 201;
    ctx.body = results;
    // console.log(results);
  } catch (error) {
    throw error;
  }
};

const updateAddress = async (ctx: ParameterizedContext, next: Next) => {
  try {
    // console.log(ctx.params);
    const { id: addressId } = ctx.params;
    const updatedAddress = ctx.request.body as IUserAddress;
    const result = await updateAddressModel(addressId, updatedAddress);
    ctx.status = 201;
    ctx.body = result;
    await next();
  } catch (error) {
    throw error;
  }
};

export { registerAddress, updateAddress };

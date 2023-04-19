exports.create = (ctx) => {
  try {
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log("User not found");
  }
};

exports.login = async (ctx) => {
  try {
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    console.log("cant create user");
  }
};

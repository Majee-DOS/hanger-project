const Router = require("koa-router");
const router = new Router();
const controller = require("./controller");

router.post("/register", controller.create);

router.put("/update/:id", controller.updateUser);

router.get("/profile/:id", controller.getUser);
// router.get("/:user/warderobe");

router.post("/addItem", controller.add);

// router.get("/item/:id");

module.exports = router;

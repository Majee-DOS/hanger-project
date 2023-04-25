const Router = require("koa-router");
const router = new Router();
const controller = require("./controller");

router.post("/register", controller.create);

router.put("/update/:id", controller.updateUser);

router.get("/profile/:id", controller.getUser);

router.get("/wardrobe/:user", controller.getMine)

router.put("/addItem/:id", controller.add);

router.get("/allitems", controller.getAllItems);

module.exports = router;

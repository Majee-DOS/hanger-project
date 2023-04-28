"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const addressController_1 = require("./controllers/addressController");
const userController_1 = require("./controllers/userController");
const authenticationMiddleware_1 = __importDefault(require("./middleware/authenticationMiddleware"));
const itemsController_1 = require("./controllers/itemsController");
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, koa_bodyparser_1.default)());
// Set up your routes
router.post('/register', userController_1.loginUser);
router.post('/login', userController_1.registerUser);
router.post('/add-address', authenticationMiddleware_1.default, addressController_1.registerAddress);
router.put('/update-address/:id', authenticationMiddleware_1.default, addressController_1.updateAddress);
router.post('/add-item', authenticationMiddleware_1.default, itemsController_1.addItem);
router.get('/get-items', authenticationMiddleware_1.default, itemsController_1.getAllItems);
router.get('/user-items/:id', authenticationMiddleware_1.default, itemsController_1.getUserItems);
router.put('/update-item/:id', authenticationMiddleware_1.default, itemsController_1.editItem);
router.delete('/delete-item/:id', authenticationMiddleware_1.default, itemsController_1.deleteItem);
app.use(router.routes()).use(router.allowedMethods());
exports.callback = app.callback();

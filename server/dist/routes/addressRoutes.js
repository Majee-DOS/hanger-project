"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const addressController_1 = require("../controllers/addressController");
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const router = new koa_router_1.default();
router.post('/add-address', authenticationMiddleware_1.default, addressController_1.registerAddress);
router.put('/update-address/:id', authenticationMiddleware_1.default, addressController_1.updateAddress);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const market_service_1 = require("./market.service");
let router = express_1.default.Router();
router
    .get('/product/:id', market_service_1.getProdctById)
    .post('/product', market_service_1.createOrder)
    .get('/products', market_service_1.getAllOrders);
exports.default = router;

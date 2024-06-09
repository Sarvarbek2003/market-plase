"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_service_1 = require("./products.service");
let router = express_1.default.Router();
router
    .post('/category', products_service_1.createCategory)
    .delete('/category/:id', products_service_1.deleteCategory)
    .put('/category/:id', products_service_1.updateCategory)
    .get('/categories', products_service_1.getAllCategory)
    .post('/parametr', products_service_1.createProduct)
    .put('/parametr/:id', products_service_1.updateProduct)
    .get('/parametrs/:id', products_service_1.getAllProductParametrs)
    .get('/:id', products_service_1.getProducts)
    .post('/', products_service_1.addProduct)
    .delete('/:id', products_service_1.deleted)
    .put('/:id', products_service_1.update);
exports.default = router;

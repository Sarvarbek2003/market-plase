"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_service_1 = require("./products.service");
const jwt_verify_1 = require("../middleweare/jwt-verify");
let router = express_1.default.Router();
router
    .post('/category', jwt_verify_1.jwtVerify, products_service_1.createCategory)
    .delete('/category/:id', jwt_verify_1.jwtVerify, products_service_1.deleteCategory)
    .put('/category/:id', jwt_verify_1.jwtVerify, products_service_1.updateCategory)
    .get('/categories', jwt_verify_1.jwtVerify, products_service_1.getAllCategory)
    .post('/parametr', jwt_verify_1.jwtVerify, products_service_1.createProduct)
    .put('/parametr/:id', jwt_verify_1.jwtVerify, products_service_1.updateProduct)
    .get('/parametrs/:id', jwt_verify_1.jwtVerify, products_service_1.getAllProductParametrs)
    .get('/:id', jwt_verify_1.jwtVerify, products_service_1.getProducts)
    .post('/', jwt_verify_1.jwtVerify, products_service_1.addProduct)
    .delete('/:id', jwt_verify_1.jwtVerify, products_service_1.deleted)
    .put('/:id', jwt_verify_1.jwtVerify, products_service_1.update);
exports.default = router;

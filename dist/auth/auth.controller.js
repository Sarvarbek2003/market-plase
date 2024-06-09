"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("./auth.service");
let router = express_1.default.Router();
router
    .post('/login', auth_service_1.login)
    .post('/singup', auth_service_1.singup);
exports.default = router;

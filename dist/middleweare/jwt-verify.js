"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handle_1 = require("../utils/error.handle");
function jwtVerify(req, res, next) {
    var _a;
    try {
        let token = ((_a = req.get('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || "";
        let jwtSectet = process.env.JWT_SECRET || "";
        let payload = jsonwebtoken_1.default.verify(token, jwtSectet);
        req.user = payload;
        return next();
    }
    catch (error) {
        return next(new error_handle_1.ClientError('Unauthorized', 401));
    }
}
exports.jwtVerify = jwtVerify;

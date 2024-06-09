"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singup = exports.login = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const crypto = __importStar(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handle_1 = require("../utils/error.handle");
const library_1 = require("@prisma/client/runtime/library");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { login, password } = req.body;
            let user = yield prisma_service_1.prisma.users.findFirst({ where: { login: login } });
            if (!user)
                return next(new error_handle_1.ClientError("User not found", 403));
            let hash = crypto.createHash('sha256').update(user.uuid + password).digest('hex');
            if (hash != user.password)
                return next(new error_handle_1.ClientError("Invalid password", 403));
            let jwt = yield jwtSign({ uuid: user.uuid, name: user.name });
            return res.status(200).json({ result: 'ok', token: jwt });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function singup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { login, password, name } = req.body;
            let uuid = crypto.randomUUID();
            let hash = crypto.createHash('sha256').update(uuid + password).digest('hex');
            yield prisma_service_1.prisma.users.create({ data: {
                    name,
                    login,
                    role: 'ADMIN',
                    password: hash,
                    uuid: uuid
                } });
            return res.status(201).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError("user login or name already exists", 403));
                }
            }
            next(error);
        }
    });
}
exports.singup = singup;
function jwtSign(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let jwtSectet = process.env.JWT_SECRET || '';
            return jsonwebtoken_1.default.sign(payload, jwtSectet, { expiresIn: '12h' });
        }
        catch (error) {
            new Error(error.message);
        }
    });
}

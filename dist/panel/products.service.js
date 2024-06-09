"use strict";
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
exports.deleted = exports.update = exports.addProduct = exports.getProducts = exports.updateProduct = exports.createProduct = exports.getAllProductParametrs = exports.deleteCategory = exports.getAllCategory = exports.updateCategory = exports.createCategory = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const error_handle_1 = require("../utils/error.handle");
const fs_1 = require("fs");
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
function createCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name } = req.body;
        try {
            let data = yield prisma_service_1.prisma.categories.create({ data: {
                    name: name
                } });
            res.status(201).json({ result: 'ok', id: data.id, name: data.name, isActive: data.is_active });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('Name already exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.createCategory = createCategory;
function updateCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, is_active } = req.body;
        let { id } = req.params;
        try {
            yield prisma_service_1.prisma.categories.update({
                where: { id: Number(id) },
                data: {
                    name: name,
                    is_active: is_active ? true : false
                }
            });
            res.status(200).json({ result: 'ok' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateCategory = updateCategory;
function getAllCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield prisma_service_1.prisma.categories.findMany();
            let result = categories.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    is_active: el.is_active
                };
            });
            res.status(200).json({ result: result });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('Name already exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.getAllCategory = getAllCategory;
function deleteCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.params;
            yield prisma_service_1.prisma.categories.delete({ where: { id: Number(id) } });
            res.status(200).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    next(new error_handle_1.ClientError('Record to delete does not exist.', 403));
                }
            }
            next(error);
        }
    });
}
exports.deleteCategory = deleteCategory;
function getAllProductParametrs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.params;
            let subcategories = yield prisma_service_1.prisma.subcategories.findMany({ where: { category_id: Number(id) } });
            let result = subcategories.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    is_active: el.is_active,
                    parametrs: el.parametrs
                };
            });
            res.status(200).json({ result: result });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllProductParametrs = getAllProductParametrs;
function createProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, category_id, parametrs } = req.body;
        try {
            yield prisma_service_1.prisma.subcategories.create({ data: {
                    name: name,
                    parametrs: parametrs,
                    category_id: category_id,
                } });
            res.status(201).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('Name already exists', 400));
                }
                else if (error.code == 'P2003') {
                    next(new error_handle_1.ClientError('No such category exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.createProduct = createProduct;
function updateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, parametrs, category_id, is_active } = req.body;
        let { id } = req.params;
        try {
            let data = {
                name: name,
                parametrs: parametrs,
                is_active: is_active,
                category_id: category_id
            };
            yield prisma_service_1.prisma.subcategories.update({
                where: {
                    id: Number(id)
                },
                data: data
            });
            res.status(201).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('Name already exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.updateProduct = updateProduct;
function getProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        try {
            let produts = yield prisma_service_1.prisma.products.findMany({
                where: {
                    subcategory_id: Number(id)
                },
                orderBy: { id: 'desc' }
            });
            let result = produts.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    buy_price: el.buy_price,
                    sell_price: el.sell_price,
                    parametrs: el.parametrs,
                    uniqueid: el.uniqueid,
                    currency: el.currency,
                    photo: el.photo
                };
            });
            res.status(200).json({ result });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('Name already exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.getProducts = getProducts;
function addProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, buy_price, parametrs, sell_price, subcategory_id, uniqueid, currency } = req.body;
        try {
            parametrs = JSON.parse(parametrs);
            let { files } = req.files;
            if (!(0, fs_1.existsSync)(`files/${subcategory_id}/${files.md5}.${(0, path_1.extname)(files.name)}`)) {
                (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), 'public', `files/${subcategory_id}`), { recursive: true });
            }
            let filePath = `files/${subcategory_id}/${files.md5}${(0, path_1.extname)(files.name)}`;
            yield prisma_service_1.prisma.products.create({
                data: {
                    name: name,
                    buy_price: buy_price,
                    sell_price: sell_price,
                    uniqueid: uniqueid,
                    currency: currency,
                    parametrs: parametrs,
                    photo: filePath,
                    subcategory_id: Number(subcategory_id)
                }
            });
            try {
                yield (0, sharp_1.default)(files.data)
                    .resize({ width: 500 })
                    .toFormat('jpeg', { quality: 80 })
                    .toFile((0, path_1.join)(process.cwd(), 'public', filePath));
            }
            catch (error) {
                next(new error_handle_1.ClientError('Error compressing and saving the file.', 403));
                return;
            }
            res.status(200).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('ID already exists', 400));
                }
                else if (error.code == 'P2003') {
                    next(new error_handle_1.ClientError('No such subcategory exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.addProduct = addProduct;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, buy_price, parametrs, sell_price, subcategory_id, uniqueid } = req.body;
        let { id } = req.params;
        try {
            let data = {
                name: name,
                buy_price: buy_price,
                sell_price: sell_price,
                uniqueid: uniqueid,
                parametrs: parametrs,
                subcategory_id: Number(subcategory_id)
            };
            yield prisma_service_1.prisma.products.update({
                where: { id: Number(id) },
                data: data
            });
            res.status(200).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    next(new error_handle_1.ClientError('Name already exists', 400));
                }
                else if (error.code == 'P2003') {
                    next(new error_handle_1.ClientError('No such subcategory exists', 403));
                }
            }
            next(error);
        }
    });
}
exports.update = update;
function deleted(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        try {
            yield prisma_service_1.prisma.products.delete({ where: {
                    id: Number(id)
                } });
            res.status(200).json({ result: 'ok' });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    next(new error_handle_1.ClientError('Record to delete does not exist.', 403));
                }
            }
            next(error);
        }
    });
}
exports.deleted = deleted;

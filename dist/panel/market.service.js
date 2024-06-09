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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.createOrder = exports.getProdctById = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const error_handle_1 = require("../utils/error.handle");
const composables_1 = require("../utils/composables");
const market_adapters_1 = require("./adapters/market.adapters");
function getProdctById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.params;
            let response = yield prisma_service_1.prisma.products.findUnique({ where: { uniqueid: id } });
            res.status(200).json({ data: Object.assign({}, response) });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    next(new error_handle_1.ClientError(error.message, 403));
                }
                next(error);
            }
        }
    });
}
exports.getProdctById = getProdctById;
function createOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { vendor, comment, is_loan, month, payment_day, price, initial_payment, proc, product_id } = req.body;
            yield prisma_service_1.prisma.products.update({ where: { id: product_id }, data: { sell_price: price } });
            yield prisma_service_1.prisma.order.create({
                data: {
                    vendor: vendor,
                    comment: comment,
                    is_loan: is_loan,
                    month: month,
                    payment_day: payment_day,
                    price: initial_payment,
                    proc: proc,
                    last_payment_date: new Date(),
                    product_id: product_id
                }
            });
            return res.status(201).json({ result: "ok" });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                next(new error_handle_1.ClientError(error.message, 403));
            }
            next(error);
        }
    });
}
exports.createOrder = createOrder;
function getAllOrders(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = req.query;
            let where = yield (0, market_adapters_1.filterOrderWhereInputAdapter)(query);
            // await sleep(2000)
            if (query.type == 'non_sell') {
                let products = yield (0, composables_1.paginate)('products', prisma_service_1.prisma, {
                    page: Number(query.page || '1'),
                    size: Number(query.size || '10'),
                    where: {
                        order: null
                    }
                });
                let result = (0, market_adapters_1.productsAdapter)(products.data);
                return res.status(200).json(Object.assign(Object.assign({}, products), { data: result, isOrder: false }));
            }
            let data = yield (0, composables_1.paginate)('order', prisma_service_1.prisma, {
                page: Number(query.page || '1'),
                size: Number(query.size || '10'),
                where,
                select: {
                    comment: true,
                    is_loan: true,
                    vendor: true,
                    price: true,
                    created_at: true,
                    month: true,
                    payment_day: true,
                    last_payment_date: true,
                    products: true
                }
            });
            let result = yield (0, market_adapters_1.ordersAdapter)(data.data);
            return res.status(200).json(Object.assign(Object.assign({}, data), { data: result, isOrder: true }));
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                next(new error_handle_1.ClientError(error.message, 403));
            }
            next(error);
        }
    });
}
exports.getAllOrders = getAllOrders;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                return resolve(true);
            }, ms);
        });
    });
}

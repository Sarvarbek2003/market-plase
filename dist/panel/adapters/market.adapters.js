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
exports.ordersAdapter = exports.productsAdapter = exports.filterOrderWhereInputAdapter = void 0;
function filterOrderWhereInputAdapter(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let where = {
            is_loan: query.type == 'is_loan' ? true : undefined,
        };
        query.type == 'pay_date' ? where.AND = {
            is_loan: true,
            payment_day: new Date().getDate(),
            last_payment_date: {
                lte: new Date(new Date().getTime() - 1728000000)
            }
        } : null;
        query.type == 'pay_late' ? where.AND = {
            is_loan: false,
            payment_day: {
                lte: new Date().getDate() - 1
            },
            last_payment_date: {
                lte: new Date(new Date().getTime() - 2592000000)
            }
        } : null;
        query.type == 'all' ? where = {} : null;
        return where;
    });
}
exports.filterOrderWhereInputAdapter = filterOrderWhereInputAdapter;
function productsAdapter(array) {
    return array.map(el => {
        let arr = el.parametrs;
        let description = arr.map(e => `<b>${e.key}:</b> ${e.value},`).join('\t');
        return {
            name: el.name,
            sell_price: `${el.sell_price} ${el.currency == 'USD' ? "$" : 'so\'m'}`,
            buy_sell: `${el.buy_price} ${el.currency == 'USD' ? "$" : 'so\'m'}`,
            uniqueid: el.uniqueid,
            description: description
        };
    });
}
exports.productsAdapter = productsAdapter;
function ordersAdapter(array) {
    return array.map(el => {
        return {
            name: el.products.name,
            sell_price: `${Number(el.price).toLocaleString('ru')} ${el.products.currency == 'USD' ? "$" : 'So\'m'}`,
            uniqueid: el.products.uniqueid,
            is_loan: el.is_loan,
            vendor: el.vendor,
            created_at: el.created_at,
            month: el.is_loan ? el.month : "-",
            payment_day: el.is_loan ? el.payment_day : "-",
            last_payment_date: el.last_payment_date,
            comment: el.comment,
        };
    });
}
exports.ordersAdapter = ordersAdapter;

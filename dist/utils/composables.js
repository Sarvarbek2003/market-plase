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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const error_handle_1 = require("./error.handle");
function paginate(model, prismaClient, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let { page = 1, size = 10, orderBy, where, select } = options, otherOptions = __rest(options, ["page", "size", "orderBy", "where", "select"]);
        if (page < 1 || size < 1) {
            throw new error_handle_1.ClientError('Invalid page or limit', 403);
        }
        const client = prismaClient[model];
        const totalItems = yield client.count({ where });
        const totalPages = Math.ceil(totalItems / size);
        if (page > totalPages) {
            page = totalPages;
        }
        const offset = (page - 1) * size;
        const items = yield client.findMany(Object.assign({ skip: Math.abs(offset), take: size, orderBy,
            where,
            select }, otherOptions));
        return {
            totalPage: totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            totalItems,
            data: items
        };
    });
}
exports.paginate = paginate;

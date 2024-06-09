"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const products_controller_1 = __importDefault(require("./panel/products.controller"));
const martket_controller_1 = __importDefault(require("./panel/martket.controller"));
const app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
app.engine('html', ejs_1.default.renderFile);
app.set('view engine', 'html');
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
app.set('views', path_1.default.join(process.cwd(), 'views'));
app.use(express_1.default.json());
app.get('/', (req, res) => res.render('index'));
app.get('/create', (req, res) => res.render('create-product'));
app.get('/create-category', (req, res) => res.render('create-category'));
app.get('/add-product', (req, res) => res.render('add-product'));
app.get('/headers', (req, res) => res.render('headers'));
app.use('/auth', auth_controller_1.default);
app.use('/product', products_controller_1.default);
app.use('/market', martket_controller_1.default);
app.use((err, _req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.statusCode == 500 ? "Internal Server Error" : err.message
    });
});
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
});
app.listen(3333);

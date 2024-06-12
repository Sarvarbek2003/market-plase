(()=>{"use strict";var e={611:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(252)),o=r(456),a=r(121);let s=i.default.Router();s.post("/login",o.login).post("/singup",o.singup).get("/me",a.jwtVerify,o.me),t.default=s},456:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return i(t,e),t},a=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.jwtSign=t.singup=t.me=t.login=void 0;const u=r(488),d=o(r(982)),c=s(r(829)),l=r(602),p=r(541),f=r(330);function y(e){return a(this,void 0,void 0,(function*(){try{let t=process.env.JWT_SECRET||"";return c.default.sign(e,t,{expiresIn:"12h"})}catch(e){new Error(e.message)}}))}t.login=function(e,t,r){return a(this,void 0,void 0,(function*(){try{let{login:n,password:i}=e.body,o=yield u.prisma.users.findFirst({where:{login:n}});if(!o)return r(new l.ClientError("User not found",403));if(d.createHash("sha256").update(o.uuid+i).digest("hex")!=o.password)return r(new l.ClientError("Invalid password",403));let a=yield y({uuid:o.uuid,name:o.name});return t.status(200).json({result:"ok",token:a})}catch(e){r(e)}}))},t.me=function(e,t,r){return a(this,void 0,void 0,(function*(){try{let r=e.user,n=yield u.prisma.users.findFirst({where:{uuid:null==r?void 0:r.uuid}});return t.status(200).json({name:null==n?void 0:n.name,role:null==n?void 0:n.role})}catch(e){r(e)}}))},t.singup=function(e,t,r){return a(this,void 0,void 0,(function*(){try{let{login:r,password:n,name:i}=e.body,o=d.randomUUID(),a=d.createHash("sha256").update(o+n).digest("hex");return yield u.prisma.users.create({data:{name:i,login:r,role:f.$Enums.Role.USER,password:a,uuid:o}}),t.status(201).json({result:"ok"})}catch(e){e instanceof p.PrismaClientKnownRequestError&&"P2002"==e.code&&r(new l.ClientError("user login or name already exists",403)),r(e)}}))},t.jwtSign=y},491:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.sendTelegramMessageWithPhoto=t.bot=void 0;const o=i(r(209));let a=process.env.TELEGRAM_BOT_TOKEN||"";t.bot=new o.default(a);const s=process.env.TELEGRAM_CHANELL_ID||"";t.sendTelegramMessageWithPhoto=function(e){return n(this,void 0,void 0,(function*(){try{if(!e)return!1;let r=`*${null==e?void 0:e.name}\n${Number(null==e?void 0:e.sell_price).toLocaleString("ru")} ${"USD"==(null==e?void 0:e.currency)?"$":"so'm"}\n\n*`;for(const t of e.parametrs)r+=`${t.key}: ${t.value}\n`;return yield t.bot.sendPhoto(s,"public/"+(null==e?void 0:e.photo),{caption:r,parse_mode:"Markdown"}),!0}catch(e){return!1}}))}},156:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(252)),a=i(r(376)),s=i(r(928)),u=i(r(416)),d=i(r(611)),c=i(r(927)),l=i(r(343));i(r(818)).default.config();const p=(0,o.default)();p.use((0,a.default)()),p.engine("html",u.default.renderFile),p.set("view engine","html"),p.use(o.default.static(s.default.join(process.cwd(),"public"))),p.set("views",s.default.join(process.cwd(),"views")),p.use(o.default.json()),p.get("/",((e,t)=>t.render("index"))),p.get("/create",((e,t)=>t.render("create-product"))),p.get("/create-category",((e,t)=>t.render("create-category"))),p.get("/login",((e,t)=>t.render("login-page"))),p.get("/add-product",((e,t)=>t.render("add-product"))),p.get("/headers",((e,t)=>t.render("headers"))),p.get("/products",((e,t)=>t.render("products"))),p.use(((e,t,r)=>n(void 0,void 0,void 0,(function*(){let t=e.get("sleep");t?function(e){return n(this,void 0,void 0,(function*(){return new Promise((t=>{setTimeout((()=>t(!0)),e)}))}))}(Number(t)).then((()=>r())):r()})))),p.use("/auth",d.default),p.use("/product",c.default),p.use("/market",l.default),p.use(((e,t,r,n)=>(e.statusCode=e.statusCode||500,e.status=e.status||"error",r.status(e.statusCode).json({status:e.status,message:500==e.statusCode?"Internal Server Error":e.message})))),process.on("unhandledRejection",(e=>{console.error("UNHANDLED REJECTION! 💥 Shutting down..."),console.error(e.name,e.message)})),p.listen(3333)},121:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.jwtVerify=void 0;const i=n(r(829)),o=r(602);t.jwtVerify=function(e,t,r){var n;try{let t=(null===(n=e.get("authorization"))||void 0===n?void 0:n.split(" ")[1])||"",o=process.env.JWT_SECRET||"",a=i.default.verify(t,o);return e.user=a,r()}catch(e){return r(new o.ClientError("Unauthorized",401))}}},824:function(e,t){var r=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.ordersAdapter=t.productsAdapter=t.filterOrderWhereInputAdapter=void 0,t.filterOrderWhereInputAdapter=function(e){return r(this,void 0,void 0,(function*(){let t={is_loan:"is_loan"==e.type||void 0};return"pay_date"==e.type&&(t.AND={is_loan:!0,payment_day:(new Date).getDate(),last_payment_date:{lte:new Date((new Date).getTime()-1728e6)}}),"pay_late"==e.type&&(t.AND={is_loan:!1,payment_day:{lte:(new Date).getDate()-1},last_payment_date:{lte:new Date((new Date).getTime()-2592e6)}}),"all"==e.type&&(t={}),t}))},t.productsAdapter=function(e){return e.map((e=>{let t=e.parametrs.map((e=>`<b>${e.key}:</b> ${e.value},`)).join("\t");return{name:e.name,sell_price:`${e.sell_price} ${"USD"==e.currency?"$":"so'm"}`,buy_sell:`${e.buy_price} ${"USD"==e.currency?"$":"so'm"}`,uniqueid:e.uniqueid,description:t}}))},t.ordersAdapter=function(e){return e.map((e=>({name:e.products.name,sell_price:`${Number(e.price).toLocaleString("ru")} ${"USD"==e.products.currency?"$":"So'm"}`,uniqueid:e.products.uniqueid,is_loan:e.is_loan,vendor:e.vendor,created_at:e.created_at,month:e.is_loan?e.month:"-",payment_day:e.is_loan?e.payment_day:"-",last_payment_date:e.last_payment_date,comment:e.comment})))}},88:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.sendTelegramMessage=t.getAllOrders=t.createOrder=t.getProdctById=void 0;const i=r(488),o=r(541),a=r(602),s=r(388),u=r(824),d=r(491);t.getProdctById=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let{id:r}=e.params,n=yield i.prisma.products.findUnique({where:{uniqueid:r}});t.status(200).json({data:Object.assign({},n)})}catch(e){e instanceof o.PrismaClientKnownRequestError&&("P2025"==e.code&&r(new a.ClientError(e.message,403)),r(e))}}))},t.createOrder=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let{vendor:r,comment:n,is_loan:o,month:a,payment_day:s,price:u,initial_payment:d,proc:c,product_id:l}=e.body;return yield i.prisma.products.update({where:{id:l},data:{sell_price:u}}),yield i.prisma.order.create({data:{vendor:r,comment:n,is_loan:o,month:a,payment_day:s,price:d,proc:c,last_payment_date:new Date,product_id:l}}),t.status(201).json({result:"ok"})}catch(e){e instanceof o.PrismaClientKnownRequestError&&r(new a.ClientError(e.message,403)),r(e)}}))},t.getAllOrders=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let r=e.query,n=yield(0,u.filterOrderWhereInputAdapter)(r);if("non_sell"==r.type){let e=yield(0,s.paginate)("products",i.prisma,{page:Number(r.page||"1"),size:Number(r.size||"10"),where:{order:null}}),n=(0,u.productsAdapter)(e.data);return t.status(200).json(Object.assign(Object.assign({},e),{data:n,isOrder:!1}))}let o=yield(0,s.paginate)("order",i.prisma,{page:Number(r.page||"1"),size:Number(r.size||"10"),where:n,select:{comment:!0,is_loan:!0,vendor:!0,price:!0,created_at:!0,month:!0,payment_day:!0,last_payment_date:!0,products:!0}}),a=yield(0,u.ordersAdapter)(o.data);return t.status(200).json(Object.assign(Object.assign({},o),{data:a,isOrder:!0}))}catch(e){e instanceof o.PrismaClientKnownRequestError&&r(new a.ClientError(e.message,403)),r(e)}}))},t.sendTelegramMessage=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let{id:n}=e.params,o=yield i.prisma.products.findFirstOrThrow({where:{id:Number(n)}});return(yield(0,d.sendTelegramMessageWithPhoto)(o))?t.status(200).json({result:"ok"}):r(new a.ClientError("XATOLIK: Xabar yuborilmadi",403))}catch(e){e instanceof o.PrismaClientKnownRequestError&&r(new a.ClientError("Product not found",403)),r(e)}}))}},343:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(252)),o=r(88),a=r(121);let s=i.default.Router();s.get("/product/:id",a.jwtVerify,o.getProdctById).post("/product",a.jwtVerify,o.createOrder).get("/products",a.jwtVerify,o.getAllOrders).get("/send/:id",a.jwtVerify,o.sendTelegramMessage),t.default=s},927:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(252)),o=r(612),a=r(121);let s=i.default.Router();s.post("/category",a.jwtVerify,o.createCategory).delete("/category/:id",a.jwtVerify,o.deleteCategory).put("/category/:id",a.jwtVerify,o.updateCategory).get("/categories",a.jwtVerify,o.getAllCategory).post("/parametr",a.jwtVerify,o.createProduct).put("/parametr/:id",a.jwtVerify,o.updateProduct).get("/parametrs/:id",a.jwtVerify,o.getAllProductParametrs).get("/:id",a.jwtVerify,o.getProducts).post("/",a.jwtVerify,o.addProduct).delete("/:id",a.jwtVerify,o.deleted).put("/:id",a.jwtVerify,o.update),t.default=s},612:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.deleted=t.update=t.addProduct=t.getProducts=t.updateProduct=t.createProduct=t.getAllProductParametrs=t.deleteCategory=t.getAllCategory=t.updateCategory=t.createCategory=void 0;const o=r(488),a=r(541),s=r(602),u=r(896),d=r(928),c=i(r(288));t.createCategory=function(e,t,r){return n(this,void 0,void 0,(function*(){let{name:n}=e.body;try{let e=yield o.prisma.categories.create({data:{name:n}});t.status(201).json({result:"ok",id:e.id,name:e.name,isActive:e.is_active})}catch(e){e instanceof a.PrismaClientKnownRequestError&&"P2002"==e.code&&r(new s.ClientError("Name already exists",403)),r(e)}}))},t.updateCategory=function(e,t,r){return n(this,void 0,void 0,(function*(){let{name:n,is_active:i}=e.body,{id:a}=e.params;try{yield o.prisma.categories.update({where:{id:Number(a)},data:{name:n,is_active:!!i}}),t.status(200).json({result:"ok"})}catch(e){r(e)}}))},t.getAllCategory=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let e=(yield o.prisma.categories.findMany()).map((e=>({id:e.id,name:e.name,is_active:e.is_active})));t.status(200).json({result:e})}catch(e){e instanceof a.PrismaClientKnownRequestError&&"P2002"==e.code&&r(new s.ClientError("Name already exists",403)),r(e)}}))},t.deleteCategory=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let{id:r}=e.params;yield o.prisma.categories.delete({where:{id:Number(r)}}),t.status(200).json({result:"ok"})}catch(e){e instanceof a.PrismaClientKnownRequestError&&"P2025"==e.code&&r(new s.ClientError("Record to delete does not exist.",403)),r(e)}}))},t.getAllProductParametrs=function(e,t,r){return n(this,void 0,void 0,(function*(){try{let{id:r}=e.params,n=(yield o.prisma.subcategories.findMany({where:{category_id:Number(r)}})).map((e=>({id:e.id,name:e.name,is_active:e.is_active,parametrs:e.parametrs})));t.status(200).json({result:n})}catch(e){r(e)}}))},t.createProduct=function(e,t,r){return n(this,void 0,void 0,(function*(){let{name:n,category_id:i,parametrs:u}=e.body;try{yield o.prisma.subcategories.create({data:{name:n,parametrs:u,category_id:i}}),t.status(201).json({result:"ok"})}catch(e){e instanceof a.PrismaClientKnownRequestError&&("P2002"==e.code?r(new s.ClientError("Name already exists",400)):"P2003"==e.code&&r(new s.ClientError("No such category exists",403))),r(e)}}))},t.updateProduct=function(e,t,r){return n(this,void 0,void 0,(function*(){let{name:n,parametrs:i,category_id:u,is_active:d}=e.body,{id:c}=e.params;try{let e={name:n,parametrs:i,is_active:d,category_id:u};yield o.prisma.subcategories.update({where:{id:Number(c)},data:e}),t.status(201).json({result:"ok"})}catch(e){e instanceof a.PrismaClientKnownRequestError&&"P2002"==e.code&&r(new s.ClientError("Name already exists",403)),r(e)}}))},t.getProducts=function(e,t,r){return n(this,void 0,void 0,(function*(){let{id:n}=e.params;try{let e=(yield o.prisma.products.findMany({where:{subcategory_id:Number(n),order:null},orderBy:{id:"desc"}})).map((e=>({id:e.id,name:e.name,buy_price:e.buy_price,sell_price:e.sell_price,parametrs:e.parametrs,uniqueid:e.uniqueid,currency:e.currency,photo:e.photo})));t.status(200).json({result:e})}catch(e){e instanceof a.PrismaClientKnownRequestError&&"P2002"==e.code&&r(new s.ClientError("Name already exists",403)),r(e)}}))},t.addProduct=function(e,t,r){return n(this,void 0,void 0,(function*(){let{name:n,buy_price:i,parametrs:l,sell_price:p,subcategory_id:f,uniqueid:y,currency:m}=e.body;try{l=JSON.parse(l);let{files:a}=e.files;(0,u.existsSync)(`files/${f}/${a.md5}.${(0,d.extname)(a.name)}`)||(0,u.mkdirSync)((0,d.join)(process.cwd(),"public",`files/${f}`),{recursive:!0});let h=`files/${f}/${a.md5}${(0,d.extname)(a.name)}`;yield o.prisma.products.create({data:{name:n,buy_price:i,sell_price:p,uniqueid:y,currency:m,parametrs:l,photo:h,subcategory_id:Number(f)}});try{yield(0,c.default)(a.data).resize({width:600}).toFormat("jpeg",{quality:90}).toFile((0,d.join)(process.cwd(),"public",h))}catch(e){return void r(new s.ClientError("Error compressing and saving the file.",403))}t.status(200).json({result:"ok"})}catch(e){e instanceof a.PrismaClientKnownRequestError&&("P2002"==e.code?r(new s.ClientError("ID already exists",400)):"P2003"==e.code&&r(new s.ClientError("No such subcategory exists",403))),r(e)}}))},t.update=function(e,t,r){return n(this,void 0,void 0,(function*(){let{name:n,buy_price:i,parametrs:u,sell_price:d,subcategory_id:c,uniqueid:l}=e.body,{id:p}=e.params;try{let e={name:n,buy_price:i,sell_price:d,uniqueid:l,parametrs:u,subcategory_id:Number(c)};yield o.prisma.products.update({where:{id:Number(p)},data:e}),t.status(200).json({result:"ok"})}catch(e){e instanceof a.PrismaClientKnownRequestError&&("P2002"==e.code?r(new s.ClientError("Name already exists",400)):"P2003"==e.code&&r(new s.ClientError("No such subcategory exists",403))),r(e)}}))},t.deleted=function(e,t,r){return n(this,void 0,void 0,(function*(){let{id:n}=e.params;try{yield o.prisma.products.delete({where:{id:Number(n)}}),t.status(200).json({result:"ok"})}catch(e){e instanceof a.PrismaClientKnownRequestError&&"P2025"==e.code&&r(new s.ClientError("Record to delete does not exist.",403)),r(e)}}))}},488:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.prisma=void 0;const n=r(330);t.prisma=new n.PrismaClient},388:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},i=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]])}return r};Object.defineProperty(t,"__esModule",{value:!0}),t.paginate=void 0;const o=r(602);t.paginate=function(e,t,r){return n(this,void 0,void 0,(function*(){let{page:n=1,size:a=10,orderBy:s,where:u,select:d}=r,c=i(r,["page","size","orderBy","where","select"]);if(n<1||a<1)throw new o.ClientError("Invalid page or limit",403);const l=t[e],p=yield l.count({where:u}),f=Math.ceil(p/a);n>f&&(n=f);const y=(n-1)*a;return{totalPage:f,currentPage:n,hasNextPage:n<f,hasPreviousPage:n>1,totalItems:p,data:yield l.findMany(Object.assign({skip:Math.abs(y),take:a,orderBy:s,where:u,select:d},c))}}))}},602:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ClientError=void 0;class r extends Error{constructor(e,t){super(e),this.statusCode=t,this.status=`${t}`.startsWith("4")?"fail":"error",this.isOperational=!0,Error.captureStackTrace(this,this.constructor)}}t.ClientError=r},330:e=>{e.exports=require("@prisma/client")},541:e=>{e.exports=require("@prisma/client/runtime/library")},818:e=>{e.exports=require("dotenv")},416:e=>{e.exports=require("ejs")},252:e=>{e.exports=require("express")},376:e=>{e.exports=require("express-fileupload")},829:e=>{e.exports=require("jsonwebtoken")},209:e=>{e.exports=require("node-telegram-bot-api")},288:e=>{e.exports=require("sharp")},982:e=>{e.exports=require("crypto")},896:e=>{e.exports=require("fs")},928:e=>{e.exports=require("path")}},t={};!function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(156)})();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
function validationMiddleware(type) {
    return (req, res, next) => {
        // const dtoObject = plainToInstance(type, req.body);
        // console.log(dtoObject);
        // validate(dtoObject).then((errors: ValidationError[]) => {
        //   if (errors.length > 0) {
        //     const message = errors.map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
        //     res.status(400).send({ message });
        //   } else {
        //     next();
        //   }
        // });
    };
}
exports.validationMiddleware = validationMiddleware;

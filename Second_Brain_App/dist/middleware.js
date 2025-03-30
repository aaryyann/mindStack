"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_PASSWORD = process.env.JWT_PASSWORD || "";
console.log(JWT_PASSWORD);
const userMiddleware = (req, res, next) => {
    // const cookiest = document.cookie
    // console.log(cookiest)
    const token = req.cookies.token;
    console.log(token);
    const decodedInfo = jsonwebtoken_1.default.verify(token, JWT_PASSWORD);
    if (decodedInfo) {
        req.userId = decodedInfo.id;
        next();
    }
    else {
        res.status(403).json({
            msg: "Please signin first"
        });
    }
};
exports.userMiddleware = userMiddleware;

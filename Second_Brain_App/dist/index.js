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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = __importDefault(require("zod"));
const db_1 = require("./db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_PASSWORD || "";
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // ✅ Allow requests from frontend
    credentials: true // ✅ Allow cookies & authentication headers
}));
const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let random = (len) => {
    let result = "";
    const charactersLength = character.length;
    for (let i = 0; i < len; i++) {
        result += character.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
console.log(process.env.MongoDB_URL);
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validUser = zod_1.default.object({
            name: zod_1.default.string().max(50),
            email: zod_1.default.string().email().min(4).max(10),
            password: zod_1.default.string().min(5).max(15)
        });
        const validUserSuccess = yield validUser.safeParse(req.body);
        if (!validUserSuccess) {
            res.json({
                msg: "Incorrect Format"
            });
            return;
        }
        const { name, email, password } = req.body;
        let exist = false;
        try {
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            yield db_1.UserModel.create({
                name: name,
                email: email,
                password: hashPassword
            });
        }
        catch (e) {
            console.log(e);
            res.status(411).json({
                msg: "User already exist"
            });
            exist = true;
        }
        if (!exist) {
            res.status(200).json({
                msg: "User created successfully"
            });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const existinguser = yield db_1.UserModel.findOne({
            email: email
        });
        if (!existinguser) {
            res.status(411).json({
                msg: "Sign up first"
            });
        }
        else {
            const matchPassword = yield bcrypt_1.default.compare(password, existinguser.password);
            if (matchPassword) {
                const token = jsonwebtoken_1.default.sign({
                    id: existinguser._id,
                }, JWT_SECRET);
                res.status(200).json({
                    token: token
                });
            }
            else {
                res.status(403).json({
                    msg: "Incorrect password"
                });
            }
        }
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            userId
        }).populate("userId", "email");
        res.json({
            content
        });
    });
});
app.post("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, link, type, description } = req.body;
        yield db_1.ContentModel.create({
            title: title,
            link: link,
            type: type,
            description: description,
            userId: req.userId,
        });
        res.json({
            msg: "Content Added Successfully"
        });
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.body.title;
        const userId = req.userId;
        yield db_1.ContentModel.deleteOne({
            title,
            userId
        });
        res.json({
            msg: "Content deleted"
        });
    });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const share = req.body.share;
        if (share) {
            const hash = random(10);
            const existingLink = yield db_1.LinkModel.findOne({
                userId: req.userId
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            yield db_1.LinkModel.create({
                userId: req.userId,
                hash: hash
            });
            res.json({
                msg: "share lonk done"
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                msg: "Link removed Successfully"
            });
        }
    });
});
app.get("/api/v1/brain/:shareLink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const shareLink = req.params.shareLink;
        const link = yield db_1.LinkModel.findOne({
            shareLink
        });
        if (!link) {
            res.json({
                msg: "Sorry Incorrect input"
            });
            return;
        }
        const content = yield db_1.ContentModel.findOne({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId
        });
        res.json({
            email: user === null || user === void 0 ? void 0 : user.email,
            content: content
        });
    });
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`${process.env.MongoDB_URL}/brain-second-app`);
        app.listen(PORT);
    });
}
main();

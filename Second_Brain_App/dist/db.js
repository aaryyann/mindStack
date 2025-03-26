"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const contentType = ['document', 'youtube', 'instagram', 'twitter', "link"];
const ContentSchema = new mongoose_2.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
    link: { type: String, required: true },
    type: { type: String, enum: contentType, required: true },
    description: { type: String, required: true }
});
const LinkSchema = new mongoose_2.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true }
});
exports.UserModel = (0, mongoose_2.model)('User', UserSchema);
exports.ContentModel = (0, mongoose_2.model)('Content', ContentSchema);
exports.LinkModel = (0, mongoose_2.model)('Link', LinkSchema);

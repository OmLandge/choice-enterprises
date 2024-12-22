"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const checkAuth = (token) => {
    if (!token) {
        return false;
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.checkAuth = checkAuth;

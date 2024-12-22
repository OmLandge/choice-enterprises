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
const client_1 = require("@prisma/client");
const checkAuth_1 = require("../lib/checkAuth");
const adminRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
adminRouter.get('/bulkPayslips', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyCode, month, year } = req.query;
    console.log(companyCode, month, year);
    const token = req.headers.authorization;
    const isAuth = (0, checkAuth_1.checkAuth)(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const payslips = yield prisma.payslip.findMany({
        where: {
            companyCode: companyCode,
            month: Number(month),
            year: Number(year),
        },
        include: {
            employee: true,
        },
    });
    if (!payslips) {
        res.status(404).json({ message: 'No payslips found' });
        return;
    }
    res.status(200).json(payslips);
}));
adminRouter.post('/bulkPayslips', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const token = req.headers.authorization;
    const isAuth = (0, checkAuth_1.checkAuth)(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const payslips = yield prisma.payslip.createMany({
        data: body,
    });
    if (!payslips) {
        res.status(400).json({ message: 'Insertion failed' });
        return;
    }
    res.status(200).json({ message: "Insertion successful" });
}));
exports.default = adminRouter;

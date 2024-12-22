import express from 'express';
import { PrismaClient } from '@prisma/client';
import { checkAuth } from '../lib/checkAuth';
import { decode, JwtPayload } from 'jsonwebtoken';

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get('/payslip', async (req, res) => {
    const { month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const decoded = decode(token) as JwtPayload;
    const userCode = decoded.username;
    const payslip = await prisma.payslip.findFirst({
        where: {
            employeeCode: userCode as string,
            month: Number(month),
            year: Number(year),
        },
        include: {
            employee: true,
        },
    });

    if (!payslip) {
        res.status(404).json({ message: 'No payslips found' });
        return;
    }

    res.status(200).json(payslip);
});

export default userRouter;
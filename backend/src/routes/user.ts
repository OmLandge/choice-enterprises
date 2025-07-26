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
    const userName = decoded.username;
    try{
    const user = await prisma.user.findUnique({
        where: {
            username: userName,
        },
    });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const userCode = user.employeeCode;
    const payslipid = await prisma.payslip.findFirst({
        where: {
            employeeCode: userCode as string,
            month: Number(month),
            year: Number(year),
        },
        select: {
            id: true,
        }
    });
    const payslip = await prisma.payslip.findFirst({
        where: {
            employeeCode: userCode as string,
            month: Number(month),
            year: Number(year),
        },
        include: {
            employee: {
                select: {
                    code: true,
                    name: true,
                    uanNo: true,
                    esiNo: true,
                }
            },
            fieldValues: {
                where:{
                    payslipId: payslipid?.id
                },
                select: {
                    fieldId: true,
                    value: true,
                    field: {
                        select: {
                            name: true,
                            category: true,
                        }
                    }
                },
            }
        },
    });

    if (!payslip) {
        res.status(404).json({ message: 'No payslips found' });
        return;
    }

    res.status(200).json(payslip);
    }catch(err){
        res.status(400).json({ message: 'Failed to fetch payslip' });
        return;
    }
});

userRouter.get("/total-payslips", async (req, res) => {
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const decoded = decode(token) as JwtPayload;
    const userName = decoded.username;
    try{
    const user = await prisma.user.findUnique({
        where: {
            username: userName,
        },
    });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const payslipsCount = await prisma.payslip.count({
        where: {
            employeeCode: user.employeeCode as string,
        },
    });
    const employeeDetails = await prisma.employee.findUnique({
        where: {
            code: user.employeeCode as string,
        },
    });
    if (!payslipsCount) {
        res.status(404).json({ message: 'No payslips found' });
        return;
    }
    res.status(200).json({ count: payslipsCount, employeeDetails });
    }catch(err){
        res.status(400).json({ message: 'Failed to fetch payslips' });
        return;
    }
})

export default userRouter;
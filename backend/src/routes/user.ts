import express from 'express';
import { checkAuth } from '../lib/checkAuth';
import { decode, JwtPayload } from 'jsonwebtoken';
import prisma from '../lib/prisma';

const userRouter = express.Router();

userRouter.get('/payslip', async (req, res) => {
    const { month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const decoded = decode(token) as JwtPayload;
    const uanNo = decoded.uanNo;
    try{
    const user = await prisma.user.findUnique({
        where: {
            uanNo: uanNo,
        },
    });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const userCode = user.employeeCode;
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
                    value:{
                        not:null
                    }
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
    const uanNo = decoded.uanNo;
    try{
    const user = await prisma.user.findUnique({
        where: {
            uanNo: uanNo,
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
    if (payslipsCount === 0) {
        res.status(404).json({ message: 'No payslips found' });
        return;
    }
    const employeeDetails = await prisma.employee.findUnique({
        where: {
            code: user.employeeCode as string,
        },
    });
    res.status(200).json({ count: payslipsCount, employeeDetails });
    }catch(err){
        res.status(400).json({ message: 'Failed to fetch payslips' });
        return;
    }
})

export default userRouter;
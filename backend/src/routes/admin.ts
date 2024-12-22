import express from 'express';
import { PrismaClient } from '@prisma/client';
import { checkAuth } from '../lib/checkAuth';

const adminRouter = express.Router();
const prisma = new PrismaClient();

adminRouter.get('/bulkPayslips', async (req, res) => {
    const { companyCode, month, year } = req.query;
    console.log(companyCode, month, year);
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const payslips = await prisma.payslip.findMany({
        where: {
            companyCode: companyCode as string,
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
});

adminRouter.post('/bulkPayslips', async (req, res) => {
    const body = req.body;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const payslips = await prisma.payslip.createMany({
            data: body,
        });
        if(!payslips) {
            res.status(400).json({ message: 'Insertion failed' });
            return;
        }
    }catch(err) {
        res.status(400).json({ message: 'Insertion failed' });
        return;
    }


    res.status(200).json({message: "Insertion successful"});
});

export default adminRouter;
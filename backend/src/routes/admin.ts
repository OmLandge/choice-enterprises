import express from 'express';
import { PrismaClient } from '@prisma/client';
import { checkAuth } from '../lib/checkAuth';
import { companySchema, employeeSchema, payslipSchema } from '../lib/zodSchemas';
import * as bcrypt from 'bcrypt';

const adminRouter = express.Router();
const prisma = new PrismaClient();

adminRouter.get('/bulkPayslips', async (req, res) => {
    const { companyCode, month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
    const payslips = await prisma.payslip.findMany({
        where: {
            companyCode: companyCode as string,
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
            fieldValues:{
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

    if (!payslips) {
        res.status(404).json({ message: 'No payslips found' });
        return;
    }

    res.status(200).json(payslips);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch payslips' });
        return;
    }
});

adminRouter.get('/overtimeRegister', async (req, res) => {
    const { companyCode, month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const overtimeRegister = await prisma.payslip.findMany({
            where: {
                companyCode: companyCode as string,
                month: Number(month),
                year: Number(year),
                otHours: {
                    gt: 0
                }
            },
            select: {
                employee: {
                    select: {
                        name: true,
                        fatherName: true,
                        sex: true
                    }
                },
                company: {
                    select: {
                        name: true,
                        address: true
                    }
                },
                designation: true,
                otHours: true,
                perDayRate: true,
                perHourRate: true,
            },
        });
        if (!overtimeRegister) {
            res.status(404).json({ message: 'No overtime register found' });
            return;
        }
        res.status(200).json(overtimeRegister);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch overtime register' });
        return;
    }
})

adminRouter.get('/leaveRegister', async (req, res) => {
    const { companyCode, month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const leaveRegister = await prisma.payslip.findMany({
            where: {
                companyCode: companyCode as string,
                month: Number(month),
                year: Number(year),
            },
            select: {
                employee: {
                    select: {
                        name: true,
                    }
                },
                company: {
                    select: {
                        name: true,
                        address: true,
                        location: true
                    }
                },
                daysWorked: true,
                basic: true,
                da: true
            },
        });
        if (!leaveRegister) {
            res.status(404).json({ message: 'No leave register found' });
            return;
        }
        res.status(200).json(leaveRegister);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch leave register' });
        return;
    }
})

adminRouter.get('/houseRentRegister', async (req, res) => {
    const { companyCode, month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const houseRentRegister = await prisma.payslip.findMany({
            where: {
                companyCode: companyCode as string,
                month: Number(month),
                year: Number(year),

                // Only include payslips that have a non-zero house_rent_allowance
                fieldValues: {
                    some: {
                        value: {
                            not: 0,
                        },
                        field: {
                            name: "house_rent_allowance",
                        },
                    },
                },
            },
            select: {
                employee: {
                    select: {
                        name: true,
                    },
                },
                company: {
                    select: {
                        name: true,
                    },
                },
                fieldValues: {
                    where: {
                        value: {
                            not: 0,
                        },
                        field: {
                            name: "house_rent_allowance",
                        },
                    },
                    select: {
                        value: true,
                    },
                },
            },
        });
        if (!houseRentRegister) {
            res.status(404).json({ message: 'No house rent register found' });
            return;
        }
        res.status(200).json(houseRentRegister);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch house rent register' });
        return;
    }
})

adminRouter.get('/advanceRegister', async (req, res) => {
    const { companyCode, month, year } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const advanceRegister = await prisma.payslip.findMany({
            where: {
                companyCode: companyCode as string,
                month: Number(month),
                year: Number(year),

                // Only include payslips that have a non-zero house_rent_allowance
                fieldValues: {
                    some: {
                        value: {
                            not: 0,
                        },
                        field: {
                            name: "advance",
                        },
                    },
                },
            },
            select: {
                employee: {
                    select: {
                        name: true,
                        fatherName: true,
                    },
                },
                company: {
                    select: {
                        name: true,
                        address: true,
                    },
                },
                fieldValues: {
                    where: {
                        value: {
                            not: 0,
                        },
                        field: {
                            name: "advance",
                        },
                    },
                    select: {
                        value: true,
                    },
                },
                designation: true,
                dateOfAdvance: true
            },
        });
        if (!advanceRegister) {
            res.status(404).json({ message: 'No advance register found' });
            return;
        }
        res.status(200).json(advanceRegister);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch advance register' });
        return;
    }
})

adminRouter.get('/companyDetails', async (req, res) => {
    const { companyCode } = req.query;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const companyDetails = await prisma.company.findFirst({
            where: {
                code: companyCode as string,
            },
        });
        if (!companyDetails) {
            res.status(404).json({ message: 'No company found' });
            return;
        }
        res.status(200).json(companyDetails);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch company' });
        return;
    }
})

adminRouter.get("/companies", async (req, res) => {
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const companies = await prisma.company.findMany();
        if (!companies) {
            res.status(404).json({ message: 'No companies found' });
            return;
        }
        res.status(200).json(companies);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch companies' });
        return;
    }
})

adminRouter.get("/contacts", async (req, res) => {
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const contacts = await prisma.contact.findMany();
        if (!contacts) {
            res.status(404).json({ message: 'No contacts found' });
            return;
        }
        res.status(200).json(contacts);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch contacts' });
        return;
    }
})

adminRouter.get("/total-contacts", async (req, res) => {
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const contacts = await prisma.contact.count();
        if (!contacts) {
            res.status(404).json({ message: 'No contacts found' });
            return;
        }
        res.status(200).json(contacts);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch contacts' });
        return;
    }
})

adminRouter.get("/total-employees", async (req, res) => {
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const employees = await prisma.employee.count();
        if (!employees) {
            res.status(404).json({ message: 'No employees found' });
            return;
        }
        res.status(200).json(employees);
    }catch(err) {
        res.status(400).json({ message: 'Failed to fetch employees' });
        return;
    }
})

adminRouter.post("/company", async (req, res) => {
    const body = req.body;
    const zRes = companySchema.safeParse(body);
    if (!zRes.success) {
        res.status(400).json({ message: `Invalid company details` });
        return;
    }
    const {companyCode, company, address, location, fields} = zRes.data;
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const companyRes = await prisma.company.create({
            data: {
                code: companyCode,
                name: company,
                address,
                location,
            },
        });
        if(!companyRes) {
            res.status(400).json({ message: 'Company insertion failed' });
            return;
        }
        const companyFieldsRes = await prisma.companyPayslipField.createMany({
            data: fields.map((field) => ({
                companyCode: companyRes.code,
                name: field.name,
                category: field.category,
                isRequired: field.isRequired,
            })),
        });
        if(!companyFieldsRes) {
            res.status(400).json({ message: 'Company fields insertion failed' });
            return;
        }
    }catch(err) {
        res.status(400).json({ message: 'Insertion failed' });
        return;
    }
    res.status(200).json({message: "Insertion successful"});
})

adminRouter.post("/employee", async(req, res) => {
    const body = req.body;
    const zRes = employeeSchema.safeParse(body);
    if (!zRes.success) {
        res.status(400).json({ message: "Invalid employee details" });
        return;
    }
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const employeeRes = await prisma.employee.createMany({
            data: zRes.data.employees.map((employee) => ({
                code: employee.employeeCode,
                name: employee.fullName,
                uanNo: employee.uanNo,
                esiNo: employee.esiNo,
                fatherName: employee.fatherName,
                sex: employee.sex,
            })),
        });
        if(!employeeRes) {
            res.status(400).json({ message: 'Employee insertion failed' });
            return;
        }
        const userRes = await prisma.user.createMany({
            data: zRes.data.employees.map((employee) => ({
                uanNo: employee.uanNo,
                name: employee.fullName,
                role: employee.role,
                employeeCode: employee.employeeCode,
            })),
        });
        if(!userRes) {
            res.status(400).json({ message: 'User insertion failed' });
            return;
        }
    }catch(err) {
        res.status(400).json({ message: 'Insertion failed' });
        return;
    }
    res.status(200).json({message: "Insertion successful"});
})

adminRouter.post("/payslips", async(req, res) => {
    const body = req.body;
    const zRes = payslipSchema.safeParse(body);
    if (!zRes.success) {
        res.status(400).json({ message: "Invalid payslip details" });
        return;
    }
    const token = req.headers.authorization as string;
    const isAuth = checkAuth(token);
    if (!isAuth) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const {formData, payslips} = zRes.data;
    const fixedFields = [
        "employeeCode",
        "companyCode",
        "daysWorked",
        "otHours",
        "gross",
        "grossWages",
        "totalDeduction",
        "netWages",
        "designation",
        "dateOfAdvance",
        "perDayRate",
        "perHourRate",
        "basic",
        "da",
      ];
    try {
        for(const payslip of payslips) {
            const payslipRes = await prisma.payslip.create({
                data: {
                    companyCode: formData.company,
                    month: formData.month,
                    year: formData.year,
                    employeeCode: payslip.employeeCode,
                    daysWorked: payslip.daysWorked,
                    basic: payslip.basic,
                    da: payslip.da,
                    otHours: payslip.otHours,
                    gross: payslip.gross,
                    grossWages: payslip.grossWages,
                    totalDeduction: payslip.totalDeduction,
                    netWages: payslip.netWages,
                    designation: payslip.designation,
                    dateOfAdvance: payslip.dateOfAdvance,
                    perDayRate: payslip.perDayRate,
                    perHourRate: payslip.perHourRate,
                }
            })
            if(!payslipRes) {
                res.status(400).json({ message: 'Payslip insertion failed' });
                return;
            }
            const customFields = Object.entries(payslip).filter(([key]) => !fixedFields.includes(key));
            const fieldIds = await prisma.companyPayslipField.findMany({
                where: {
                    companyCode: formData.company,
                },
            });
            fieldIds.forEach((field) => {
                if(!customFields.find(([key]) => key === field.name)) {
                    res.status(400).json({ message: 'Field values insertion failed' });
                    return;
                }
            })
            const fieldValues = await prisma.payslipFieldValue.createMany({
                data: customFields.map(([key, value]) => ({
                    payslipId: payslipRes.id,
                    fieldId: fieldIds.find((field) => field.name === key)?.id!,
                    value: Number(value),
                })),
            });
            if(!fieldValues) {
                res.status(400).json({ message: 'Field values insertion failed' });
                return;
            }
        }
        }catch(err) {
        res.status(400).json({ message: 'Insertion failed' });
        return;
    }
    res.status(200).json({message: "Insertion successful"});
})

export default adminRouter;
import { z } from 'zod';

export const loginSchema = z.object({
    unaNo: z.string(),
});

export const getPayslipSchema = z.object({
    month: z.number(),
    year: z.number(),
});

export const contactSchema = z.object({
    name: z.string(),
    contactMethod: z.string(),
    email: z.preprocess(val => val === '' ? undefined: val, z.string().email().optional()),
    phone: z.string().optional(),
    concern: z.string(),
});

export const companySchema = z.object({
    companyCode: z.string(),
    company: z.string(),
    fields: z.array(z.object({
        name: z.string(),
        category: z.enum(["EARNING", "DEDUCTION"]),
        isRequired: z.boolean(),
    })),
});

export const employeeSchema = z.object({
    employees: z.array(z.object({
    employeeCode: z.string(),
    esiNo: z.preprocess(val => val === '' ? 'N/A': val, z.string()),
    uanNo: z.string(),
    fullName: z.string(),
    fatherName: z.string(),
    sex: z.string(),
    role: z.enum(["EMPLOYEE"]),
}))});

export const payslipSchema = z.object({
    formData: z.object({
        company: z.string(),
        month: z.number(),
        year: z.number(),
    }),
    payslips: z.array(z.object({
        employeeCode: z.string(),
        daysWorked: z.coerce.number(),
        basic: z.coerce.number(),
        da: z.coerce.number(),
        basic_da: z.coerce.number(),
        otHours: z.coerce.number(),
        monthlyGross: z.coerce.number(),
        grossWages: z.coerce.number(),
        totalDeduction: z.coerce.number(),
        netWages: z.coerce.number(),
        designation: z.string(),
        dateOfAdvance: z.string().optional(),
        perDayRate: z.coerce.number(),
        perHourRate: z.coerce.number(),
    }).catchall(z.coerce.number())),
});



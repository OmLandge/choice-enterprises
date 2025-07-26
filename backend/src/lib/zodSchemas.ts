import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
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
    uanNo: z.preprocess(val => val === '' ? 'N/A': val, z.string()),
    fullName: z.string(),
    password: z.string(),
    role: z.enum(["EMPLOYEE"]),
    username: z.string(),
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
        otHours: z.coerce.number(),
        monthlyGross: z.coerce.number(),
        grossWages: z.coerce.number(),
        totalDeduction: z.coerce.number(),
        netWages: z.coerce.number(),
    }).catchall(z.coerce.number())),
});

export const updatePasswordSchema = z.object({
    previousPassword: z.string(),
    newPassword: z.string(),
});

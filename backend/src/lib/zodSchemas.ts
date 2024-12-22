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
    email: z.string().email().optional(),
    phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).optional(),
    concern: z.string(),
});
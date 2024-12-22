import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const getPayslipSchema = z.object({
    month: z.number(),
    year: z.number(),
});
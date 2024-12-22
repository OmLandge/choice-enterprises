"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
// Utility function to generate a random date
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// Function to generate random employee code
function generateEmployeeCode(companyCode) {
    return `${companyCode}-${faker_1.faker.string.numeric(4)}`;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear existing data
        yield prisma.payslipFieldValue.deleteMany();
        yield prisma.companyPayslipField.deleteMany();
        yield prisma.payslip.deleteMany();
        yield prisma.employee.deleteMany();
        yield prisma.company.deleteMany();
        yield prisma.user.deleteMany();
        // Create Companies
        const companiesData = [
            { code: 'TECH001', name: 'TechInnovate Solutions' },
            { code: 'CONS002', name: 'Global Consulting Group' },
            { code: 'SOFT003', name: 'Software Dynamics Inc.' },
            { code: 'PROD004', name: 'Production Pioneers' },
            { code: 'CONS005', name: 'Consulting Experts Ltd.' }
        ];
        const companies = yield Promise.all(companiesData.map(company => prisma.company.create({ data: company })));
        // Create Custom Payslip Fields for each Company
        const customFieldsData = companies.flatMap(company => [
            {
                companyId: company.id,
                name: 'uniformWashing',
                type: 'AMOUNT',
                category: 'DEDUCTION',
                isRequired: false
            },
            {
                companyId: company.id,
                name: 'childEducation',
                type: 'AMOUNT',
                category: 'EARNING',
                isRequired: false
            },
            {
                companyId: company.id,
                name: 'performanceBonus',
                type: 'PERCENTAGE',
                category: 'EARNING',
                isRequired: false
            }
        ]);
        yield prisma.companyPayslipField.createMany({
            data: customFieldsData
        });
        // Create Employees and Users
        const employeesData = [];
        const usersData = [];
        for (const company of companies) {
            for (let i = 0; i < 50; i++) {
                const firstName = faker_1.faker.person.firstName();
                const lastName = faker_1.faker.person.lastName();
                const employeeCode = generateEmployeeCode(company.code);
                // Employee data
                const employeeData = {
                    code: employeeCode,
                    name: `${firstName} ${lastName}`,
                    uanNo: faker_1.faker.string.numeric(12),
                    esiNo: faker_1.faker.string.numeric(10)
                };
                // User data
                const username = faker_1.faker.internet.username({ firstName, lastName });
                const hashedPassword = yield bcrypt.hash('Password123!', 10);
                employeesData.push(employeeData);
                usersData.push({
                    username,
                    password: hashedPassword,
                    name: `${firstName} ${lastName}`,
                    role: i < 5 ? 'ADMIN' : 'EMPLOYEE',
                    employeeCode
                });
            }
        }
        // Create Employees
        yield prisma.employee.createMany({
            data: employeesData
        });
        // Create Users
        yield prisma.user.createMany({
            data: usersData
        });
        // Create Payslips (2 years of historical data)
        const currentDate = new Date();
        const payslipsData = [];
        const payslipFieldValuesData = [];
        for (const company of companies) {
            // Find employees for this company
            const employees = yield prisma.employee.findMany({
                where: {
                    code: {
                        startsWith: company.code
                    }
                }
            });
            // Find company-specific custom fields
            const customFields = yield prisma.companyPayslipField.findMany({
                where: { companyId: company.id }
            });
            // Generate payslips for 24 months (2 years)
            for (const employee of employees) {
                for (let month = 0; month < 24; month++) {
                    const payslipDate = new Date(currentDate.getFullYear() - 2, month, 1);
                    // Calculate basic details
                    const daysWorked = Math.min(faker_1.faker.number.float({ min: 20, max: 30, fractionDigits: 1 }), 30);
                    const rate = faker_1.faker.number.float({ min: 300, max: 1000, fractionDigits: 2 });
                    const basicDa = daysWorked * rate * 0.4;
                    const hra = daysWorked * rate * 0.2;
                    const normalEarnings = daysWorked * rate;
                    const grossWages = basicDa + hra + normalEarnings;
                    const payslipData = {
                        employeeCode: employee.code,
                        companyCode: company.code,
                        month: (payslipDate.getMonth() + 1),
                        year: payslipDate.getFullYear(),
                        daysWorked,
                        rate,
                        basicDa,
                        hra,
                        normalEarnings,
                        grossWages,
                        totalDeduction: faker_1.faker.number.float({ min: 500, max: grossWages * 0.3, fractionDigits: 2 }),
                        netWages: 0, // Will be calculated
                        issuedDate: payslipDate
                    };
                    // Calculate net wages
                    payslipData.netWages = payslipData.grossWages - payslipData.totalDeduction;
                    payslipsData.push(payslipData);
                    // Generate custom field values for each payslip
                    for (const field of customFields) {
                        let value = 0;
                        if (field.type === 'AMOUNT') {
                            value = faker_1.faker.number.float({ min: 50, max: 500, fractionDigits: 2 });
                        }
                        else if (field.type === 'PERCENTAGE') {
                            value = faker_1.faker.number.float({ min: 1, max: 10, fractionDigits: 2 });
                        }
                        payslipFieldValuesData.push({
                            fieldId: field.id,
                            value
                        });
                    }
                }
            }
        }
        // Create Payslips
        const createdPayslips = yield prisma.payslip.createMany({
            data: payslipsData
        });
        // Find the created payslips to link field values
        const payslips = yield prisma.payslip.findMany();
        // Create Payslip Field Values
        const finalPayslipFieldValues = payslips.flatMap((payslip, index) => payslipFieldValuesData
            .slice(index * customFieldsData.length, (index + 1) * customFieldsData.length)
            .map(fieldValue => (Object.assign(Object.assign({}, fieldValue), { payslipId: payslip.id }))));
        yield prisma.payslipFieldValue.createMany({
            data: finalPayslipFieldValues
        });
        console.log('Seeding completed successfully!');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));

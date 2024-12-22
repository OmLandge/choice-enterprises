import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Utility function to generate a random date
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to generate random employee code
function generateEmployeeCode(companyCode: string): string {
  return `${companyCode}-${faker.string.numeric(4)}`;
}

async function main() {
  // Clear existing data
  await prisma.payslipFieldValue.deleteMany();
  await prisma.companyPayslipField.deleteMany();
  await prisma.payslip.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // Create Companies
  const companiesData = [
    { code: 'TECH001', name: 'TechInnovate Solutions' },
    { code: 'CONS002', name: 'Global Consulting Group' },
    { code: 'SOFT003', name: 'Software Dynamics Inc.' },
    { code: 'PROD004', name: 'Production Pioneers' },
    { code: 'CONS005', name: 'Consulting Experts Ltd.' }
  ];

  const companies = await Promise.all(
    companiesData.map(company => 
      prisma.company.create({ data: company })
    )
  );

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
  ] as Prisma.CompanyPayslipFieldCreateManyInput[]);

  await prisma.companyPayslipField.createMany({
    data: customFieldsData
  });

  // Create Employees and Users
  const employeesData = [];
  const usersData = [];

  for (const company of companies) {
    for (let i = 0; i < 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const employeeCode = generateEmployeeCode(company.code);

      // Employee data
      const employeeData = {
        code: employeeCode,
        name: `${firstName} ${lastName}`,
        uanNo: faker.string.numeric(12),
        esiNo: faker.string.numeric(10)
      };

      // User data
      const username = faker.internet.username({ firstName, lastName });
      const hashedPassword = await bcrypt.hash('Password123!', 10);

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
  await prisma.employee.createMany({
    data: employeesData
  });

  // Create Users
  await prisma.user.createMany({
    data: usersData as Prisma.UserCreateManyInput[]
  });

  // Create Payslips (2 years of historical data)
  const currentDate = new Date();
  const payslipsData = [];
  const payslipFieldValuesData: any[] = [];

  for (const company of companies) {
    // Find employees for this company
    const employees = await prisma.employee.findMany({
      where: { 
        code: { 
          startsWith: company.code 
        } 
      }
    });

    // Find company-specific custom fields
    const customFields = await prisma.companyPayslipField.findMany({
      where: { companyId: company.id }
    });

    // Generate payslips for 24 months (2 years)
    for (const employee of employees) {
      for (let month = 0; month < 24; month++) {
        const payslipDate = new Date(currentDate.getFullYear() - 2, month, 1);
        
        // Calculate basic details
        const daysWorked = Math.min(faker.number.float({ min: 20, max: 30, fractionDigits: 1 }), 30);
        const rate = faker.number.float({ min: 300, max: 1000, fractionDigits: 2 });
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
          totalDeduction: faker.number.float({ min: 500, max: grossWages * 0.3, fractionDigits: 2 }),
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
            value = faker.number.float({ min: 50, max: 500, fractionDigits: 2 });
          } else if (field.type === 'PERCENTAGE') {
            value = faker.number.float({ min: 1, max: 10, fractionDigits: 2 });
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
  const createdPayslips = await prisma.payslip.createMany({
    data: payslipsData
  });

  // Find the created payslips to link field values
  const payslips = await prisma.payslip.findMany();

  // Create Payslip Field Values
  const finalPayslipFieldValues = payslips.flatMap((payslip, index) => 
    payslipFieldValuesData
      .slice(index * customFieldsData.length, (index + 1) * customFieldsData.length)
      .map(fieldValue => ({
        ...fieldValue,
        payslipId: payslip.id
      }))
  );

  await prisma.payslipFieldValue.createMany({
    data: finalPayslipFieldValues
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
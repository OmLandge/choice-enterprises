import { PrismaClient, Role, FieldCategory } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Utility function to generate a random date within a range
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to generate random employee code
function generateEmployeeCode(companyCode: string): string {
  return `${companyCode}-${faker.string.numeric(4)}`;
}

// Custom field templates for different companies
const companyFieldTemplates = [
  // Company 1 - IT Company
  [
    // Earnings (5)
    { name: 'basic_salary', category: FieldCategory.EARNING, isRequired: true },
    { name: 'hra', category: FieldCategory.EARNING, isRequired: true },
    { name: 'conveyance_allowance', category: FieldCategory.EARNING, isRequired: false },
    { name: 'medical_allowance', category: FieldCategory.EARNING, isRequired: false },
    { name: 'performance_bonus', category: FieldCategory.EARNING, isRequired: false },
    // Deductions (3)
    { name: 'professional_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'income_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'provident_fund', category: FieldCategory.DEDUCTION, isRequired: true },
  ],
  // Company 2 - Manufacturing
  [
    // Earnings (5)
    { name: 'basic_wage', category: FieldCategory.EARNING, isRequired: true },
    { name: 'dearness_allowance', category: FieldCategory.EARNING, isRequired: true },
    { name: 'overtime', category: FieldCategory.EARNING, isRequired: false },
    { name: 'shift_allowance', category: FieldCategory.EARNING, isRequired: false },
    { name: 'production_incentive', category: FieldCategory.EARNING, isRequired: false },
    // Deductions (3)
    { name: 'professional_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'provident_fund', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'esi_contribution', category: FieldCategory.DEDUCTION, isRequired: true },
  ],
  // Company 3 - Retail
  [
    // Earnings (5)
    { name: 'basic_pay', category: FieldCategory.EARNING, isRequired: true },
    { name: 'hra', category: FieldCategory.EARNING, isRequired: true },
    { name: 'sales_commission', category: FieldCategory.EARNING, isRequired: false },
    { name: 'incentive_bonus', category: FieldCategory.EARNING, isRequired: false },
    { name: 'holiday_pay', category: FieldCategory.EARNING, isRequired: false },
    // Deductions (3)
    { name: 'professional_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'income_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'pf_contribution', category: FieldCategory.DEDUCTION, isRequired: true },
  ],
  // Company 4 - Healthcare
  [
    // Earnings (5)
    { name: 'basic_salary', category: FieldCategory.EARNING, isRequired: true },
    { name: 'hra', category: FieldCategory.EARNING, isRequired: true },
    { name: 'night_shift_allowance', category: FieldCategory.EARNING, isRequired: false },
    { name: 'medical_allowance', category: FieldCategory.EARNING, isRequired: false },
    { name: 'on_call_allowance', category: FieldCategory.EARNING, isRequired: false },
    // Deductions (3)
    { name: 'professional_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'income_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'health_insurance', category: FieldCategory.DEDUCTION, isRequired: true },
  ],
  // Company 5 - Education
  [
    // Earnings (5)
    { name: 'basic_pay', category: FieldCategory.EARNING, isRequired: true },
    { name: 'da', category: FieldCategory.EARNING, isRequired: true },
    { name: 'hra', category: FieldCategory.EARNING, isRequired: true },
    { name: 'transport_allowance', category: FieldCategory.EARNING, isRequired: false },
    { name: 'research_grant', category: FieldCategory.EARNING, isRequired: false },
    // Deductions (3)
    { name: 'professional_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'income_tax', category: FieldCategory.DEDUCTION, isRequired: true },
    { name: 'nps_contribution', category: FieldCategory.DEDUCTION, isRequired: true },
  ],
];

async function main() {
  console.log('Starting seed...');
  
  // Clear existing data
  await prisma.payslipFieldValue.deleteMany();
  await prisma.companyPayslipField.deleteMany();
  await prisma.payslip.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  await prisma.contact.deleteMany();

  // Create 5 Companies
  const companies = [];
  const companyNames = [
    'Tech Solutions Inc.',
    'Manufacturing Corp',
    'Retail Group',
    'Healthcare Systems',
    'Education First'
  ];

  for (let i = 0; i < 5; i++) {
    const company = await prisma.company.create({
      data: {
        code: `COMP${String(i + 1).padStart(3, '0')}`,
        name: companyNames[i],
      },
    });
    companies.push(company);
    console.log(`Created company: ${company.name}`);
  }

  // Create custom fields for each company
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const fields = companyFieldTemplates[i];
    
    for (const field of fields) {
      await prisma.companyPayslipField.create({
        data: {
          companyCode: company.code,
          name: field.name,
          category: field.category,
          isRequired: field.isRequired,
        },
      });
    }
    console.log(`Created custom fields for company: ${company.name}`);
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });
  console.log(`Created admin user: ${admin.username}`);

  // Create employees and payslips for each company
  const currentDate = new Date();
  
  for (const company of companies) {
    // Get company fields for payslip values
    const companyFields = await prisma.companyPayslipField.findMany({
      where: { companyCode: company.code },
    });

    // Create 5 employees for this company
    for (let empIndex = 0; empIndex < 5; empIndex++) {
      const employeeCode = generateEmployeeCode(company.code);
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const fullName = `${firstName} ${lastName}`;
      
      // Create employee
      const employee = await prisma.employee.create({
        data: {
          code: employeeCode,
          name: fullName,
          uanNo: faker.string.numeric(12),
          esiNo: faker.string.numeric(17),
        },
      });
      console.log(`Created employee: ${employee.name} (${employee.code})`);

      // Create user for employee
      const user = await prisma.user.create({
        data: {
          username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
          password: await bcrypt.hash('password123', 10),
          name: fullName,
          role: Role.EMPLOYEE,
          employeeCode: employee.code,
        },
      });

      // Create 5 payslips for the last 5 months
      for (let monthOffset = 0; monthOffset < 5; monthOffset++) {
        const targetDate = new Date(currentDate);
        targetDate.setMonth(targetDate.getMonth() - monthOffset);
        
        const month = targetDate.getMonth() + 1; // 1-12
        const year = targetDate.getFullYear();
        
        // Generate random values for payslip
        const monthlyGross = faker.number.float({ min: 25000, max: 150000, fractionDigits: 2 });
        const daysWorked = faker.number.int({ min: 22, max: 26 });
        const otHours = faker.number.int({ min: 0, max: 20 });
        
        // Calculate gross wages (monthly + OT)
        const hourlyRate = monthlyGross / (22 * 8); // Assuming 22 working days, 8 hours per day
        const otWages = otHours * hourlyRate * 1.5; // 1.5x for OT
        const grossWages = monthlyGross + otWages;
        
        // Calculate deductions (random percentage of gross)
        const totalDeduction = grossWages * faker.number.float({ min: 0.1, max: 0.3, fractionDigits: 2 });
        const netWages = grossWages - totalDeduction;
        
        // Create payslip
        const payslip = await prisma.payslip.create({
          data: {
            employeeCode: employee.code,
            companyCode: company.code,
            month,
            year,
            daysWorked,
            otHours,
            monthlyGross,
            grossWages,
            totalDeduction,
            netWages,
          },
        });

        // Create field values for this payslip
        for (const field of companyFields) {
          // Generate random value based on field type
          let value = 0;
          if (field.category === FieldCategory.EARNING) {
            // Earning fields are typically a percentage of basic pay
            value = monthlyGross * faker.number.float({ min: 0.05, max: 0.4, fractionDigits: 2 });
          } else {
            // Deduction fields are typically a smaller percentage
            value = monthlyGross * faker.number.float({ min: 0.01, max: 0.1, fractionDigits: 2 });
          }
          
          await prisma.payslipFieldValue.create({
            data: {
              payslipId: payslip.id,
              fieldId: field.id,
              value: parseFloat(value.toFixed(2)),
            },
          });
        }
        
        console.log(`  - Created payslip for ${month}/${year} (${payslip.netWages.toFixed(2)})`);
      }
    }
  }

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
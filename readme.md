# Payroll Management System for Choice Enterprises

A full-stack payroll management system built with React, Node.js, and PostgreSQL. This application allows Choice Enterprises to manage employee payroll, generate payslips, and handle employee data.

## Features

- **User Authentication**: Secure login for both admin and employees
- **Role-based Access Control**: Different dashboards for admin and employees
- **Company Management**: Add and manage multiple companies with custom fields
- **Employee Management**: Add and manage employee details via CSV
- **Payslip Generation**: Generate and manage employee payslips in bulk
- **Custom Fields**: Define custom earnings and deductions per company
- **Dynamic Field Updates**: Add new fields to existing companies
- **Automatic Register Generation**: Generate Overtime, Leave, House Rent, Accident, Damage, Fines, Maternity and Advance registers from payslip data
- **Print-Ready Registers**: All registers are formatted for printing with proper pagination
- **Responsive Design**: Works on desktop and mobile devices
- **Secure**: JWT authentication
- **CSV Upload**: Upload employee, payslip data in CSV format
- **Contact Support**: Contact support for assistance
- **Production Ready**: Build scripts for both frontend and backend

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Framer Motion for animations

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL database
- JWT for authentication

### Development Tools
- Vite for frontend build tooling
- Prisma for database migrations
- ESLint and Prettier for code quality

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL (v12 or later)
- Git

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/OmLandge/choice-enterprises.git
   cd choice-enterprises
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database?schema=public"
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:3000
```

## Database Setup

1. Create a new PostgreSQL database
2. Run database migrations:
   ```bash
   cd backend/prisma
   npx prisma migrate dev
   ```
3. (Optional) Seed the database with sample data:
   ```bash
   cd ../
   npm run seed
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

The frontend build will be in the `frontend/dist` directory and can be served with any static file server.

## Default Admin Credentials

- **UAN Number**: CHOICE00001

## API Documentation

### Auth Endpoints
- `POST /api/auth/login` - User login

### Company Endpoints
- `GET /api/admin/companies` - Get all companies
- `GET /api/admin/companyDetails` - Get company details by code
- `POST /api/admin/company` - Create a new company with custom fields
- `POST /api/admin/company-fields` - Add new fields to an existing company

### Employee Endpoints
- `GET /api/admin/total-employees` - Get total employees count
- `POST /api/admin/employee` - Create employees using CSV file

### Payslip Endpoints (Admin)
- `GET /api/admin/bulkPayslips` - Get all payslips for a company, month, and year
- `POST /api/admin/payslips` - Create bulk payslips using CSV file

### Payslip Endpoints (User)
- `GET /api/user/payslip` - Get a specific payslip by month and year
- `GET /api/user/total-payslips` - Get total payslips count for user

### Register Endpoints (Admin)
- `GET /api/admin/overtimeRegister` - Get overtime register
- `GET /api/admin/leaveRegister` - Get leave register
- `GET /api/admin/houseRentRegister` - Get house rent register
- `GET /api/admin/advanceRegister` - Get advance register

### Contact Endpoints
- `GET /api/admin/contacts` - Get all contact requests
- `GET /api/admin/total-contacts` - Get total contacts count

## Project Structure

```
choice-enterprises/
├── backend/               # Backend source code
│   ├── src/
│   │   ├── lib/          # Utility functions and configurations
│   │   ├── routes/       # API route handlers
│   │   └── index.ts      # Main server file
│   ├── prisma/           # Prisma schema and migrations
│   └── package.json
│
├── frontend/              # Frontend source code
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utility functions
│   │   ├── hooks/        # Custom hooks
│   │   ├── config.ts     # Configuration file
│   │   └── App.tsx       # Main application component
│   └── package.json
│
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

## Contact

Om Landge - omlandge0000@gmail.com
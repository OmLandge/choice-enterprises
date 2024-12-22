require('dotenv').config();
import express, { NextFunction } from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import userRouter from './routes/user';
import { contactSchema } from './lib/zodSchemas';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.post('/contact', async (req, res) => {
  const body = req.body;
  const zRes = contactSchema.safeParse(body);
  if (!zRes.success) {
    res.status(400).json({ message: `Invalid contact details` });
    return;
  }
  try{
    const response = await prisma.contact.create({
      data: {
        name: body.name,
        contactMethod: body.contactMethod,
        email: body.email,
        phone: body.phone,  
        concern: body.concern,
      }
    });
    if(response) {
      res.status(200).json({ message: 'Contact request submitted successfully' });
      return;
    }
    res.status(400).json({ message: "Insertion failed" });
    return;
  } catch(err) {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
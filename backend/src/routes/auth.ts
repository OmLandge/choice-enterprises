import { PrismaClient } from '@prisma/client';
import express from 'express';
import jwt from 'jsonwebtoken';
import { loginSchema } from '../lib/zodSchemas';

const authRouter = express.Router();
const prisma = new PrismaClient();

authRouter.post('/login', async (req, res) => {
  const body = req.body;
  const zRes = loginSchema.safeParse(body);
  if (!zRes.success) {
    res.status(400).json({ message: zRes.error.message });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  if (user.password !== body.password) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  const token = jwt.sign({ username: body.username }, process.env.JWT_SECRET as string);

  res.status(200).json({ token, role: user.role, name: user.name });  
});

export default authRouter;

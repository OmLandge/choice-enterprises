import express from 'express';
import jwt from 'jsonwebtoken';
import { loginSchema } from '../lib/zodSchemas';
import prisma from '../lib/prisma';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const body = req.body;
  const zRes = loginSchema.safeParse(body);
  if (!zRes.success) {
    res.status(400).json({ message: zRes.error.message });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      uanNo: body.uanNo,
    },
  });

  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  const token = jwt.sign({ uanNo: body.uanNo }, process.env.JWT_SECRET as string);

  res.status(200).json({ token, role: user.role, name: user.name });  
});

export default authRouter;

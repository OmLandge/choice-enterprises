import { PrismaClient } from '@prisma/client';
import express from 'express';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import { loginSchema, updatePasswordSchema } from '../lib/zodSchemas';
import bcrypt from 'bcrypt';
import { checkAuth } from '../lib/checkAuth';

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

  if (!bcrypt.compareSync(body.password, user.password)) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  const token = jwt.sign({ username: body.username }, process.env.JWT_SECRET as string);

  res.status(200).json({ token, role: user.role, name: user.name });  
});

authRouter.post('/update-password', async (req, res) => {
  const body = req.body;
  const zRes = updatePasswordSchema.safeParse(body);
  if (!zRes.success) {
    res.status(400).json({ message: zRes.error.message });
    return;
  }
  const token = req.headers.authorization as string;
  const isAuth = checkAuth(token);
  if (!isAuth) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
  }
  const decoded = decode(token) as JwtPayload;
  const userName = decoded.username;
  const user = await prisma.user.findUnique({
    where: {
      username: userName,
    },
  });

  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  if (!bcrypt.compareSync(body.previousPassword, user.password)) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  const hashedPassword = await bcrypt.hash(body.newPassword, 10);
  const userRes = await prisma.user.update({
    where: {
      username: userName,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!userRes) {
    res.status(400).json({ message: 'Update failed' });
    return;
  }

  res.status(200).json({ message: 'Update successful' });  
});

export default authRouter;

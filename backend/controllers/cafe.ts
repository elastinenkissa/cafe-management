import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Cafe } from '../models/cafe';
import { Employee } from '../models/employee';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const newOwner = await Employee.create({
    name: req.body.name,
    login: req.body.username,
    password: passwordHash,
    token: ''
  });

  res.status(201).json(newOwner);
});

router.post('/login', async (req: Request, res: Response) => {
  const employee = await Employee.findOne({ login: req.body.username });

  if (!employee) {
    throw new Error('Employee not found.');
  }

  const passwordIsCorrect = bcrypt.compare(
    req.body.password,
    employee.password
  );

  if (!passwordIsCorrect) {
    throw new Error('Incorrect password.');
  }

  const token = jwt.sign({ id: employee._id }, 'blehh');

  employee.token = token;
  await employee.save();

  res.status(200).json(employee);
});

router.post('/', async (req: Request, res: Response) => {
  const newCafe = await Cafe.create({
    name: req.body.name,
    currency: req.body.currency,
    tables: [],
    owner: req.body.employeeId
  });

  res.status(201).json(newCafe);
});

router.get('/', async (_req: Request, res: Response) => {
  const cafes = await Cafe.find({}).populate(
    'owner',
    '-login -password -token'
  );

  res.status(200).json(cafes);
});

export default router;

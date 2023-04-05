import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Employee } from '../models/employee';

import { JWT_SECRET } from '../util/config';
import { getCurrentCafe, getEmployee, userIsOwner } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const cafe = req.cafe!;

  const employees = await Employee.find({ cafe: cafe.id });

  res.status(200).json(employees);
});

router.post(
  '/',
  [getEmployee, getCurrentCafe, userIsOwner],
  async (
    req: Request<{}, {}, { name: string; username: string; password: string }>,
    res: Response
  ) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const cafe = await req.cafe!.populate('owner');

    const newEmployee = await Employee.create({
      name: req.body.name,
      username: req.body.username,
      password: passwordHash,
      cafe: cafe.id
    });

    res.status(201).json(newEmployee);
  }
);

router.delete(
  '/:id',
  [getEmployee, getCurrentCafe, userIsOwner],
  async (req: Request<{ id: string }>, res: Response) => {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: 'Employee removed.' });
  }
);

router.post(
  '/signup',
  async (
    req: Request<{}, {}, { name: string; username: string; password: string }>,
    res: Response
  ) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newOwner = await Employee.create({
      name: req.body.name,
      username: req.body.username,
      password: passwordHash,
      token: ''
    });

    res.status(201).json(newOwner);
  }
);

router.post(
  '/login',
  async (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => {
    const employee = await Employee.findOne({
      username: req.body.username.trim()
    }).populate('cafe');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const passwordIsCorrect = bcrypt.compare(
      req.body.password.trim(),
      employee.password
    );

    if (!passwordIsCorrect) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    if (!JWT_SECRET) {
      return res.status(401).json({ message: 'Invalid secret.' });
    }

    const token = jwt.sign({ id: employee._id }, JWT_SECRET);

    employee.token = token;
    await employee.save();

    res.status(200).json(employee);
  }
);

router.patch(
  '/logout/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const loggingOutEmployee = await Employee.findById(req.params.id);

    if (!loggingOutEmployee) {
      return res.status(400).json({ message: 'Employee already logged out.' });
    }

    loggingOutEmployee.token = '';
    await loggingOutEmployee.save();

    res.status(204);
  }
);

export default router;

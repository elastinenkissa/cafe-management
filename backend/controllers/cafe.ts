import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Cafe } from '../models/cafe';
import { Employee } from '../models/employee';
import { MenuItem } from '../models/menuItem';

import { getCurrentCafe, getEmployee } from '../util/middleware';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const newOwner = await Employee.create({
    name: req.body.name,
    username: req.body.username,
    password: passwordHash,
    token: ''
  });

  res.status(201).json(newOwner);
});

router.post('/login', async (req: Request, res: Response) => {
  const employee = await Employee.findOne({ username: req.body.username });

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found.' });
  }

  const passwordIsCorrect = bcrypt.compare(
    req.body.password,
    employee.password
  );

  if (!passwordIsCorrect) {
    return res.status(401).json({ message: 'Incorrect password.' });
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
    owner: req.body.owner
  });

  res.status(201).json(newCafe);
});

router.get('/:id', async (req: Request, res: Response) => {
  const cafe = await Cafe.findById(req.params.id).populate(
    'owner',
    '-login -password -token'
  );

  res.status(200).json(cafe);
});

router.post(
  '/menu',
  [getCurrentCafe, getEmployee],
  async (req: Request, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    if (currentCafe.owner.id !== currentEmployee.id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const newMenuItem = await MenuItem.create({
      item: req.body.item,
      price: req.body.price
    });

    currentCafe.menu.concat(newMenuItem.id);
    await currentCafe?.save();

    res.status(201).json(newMenuItem);
  }
);

router.delete(
  '/menu/:id',
  [getCurrentCafe, getEmployee],
  async (req: Request, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    if (currentCafe.owner.id !== currentEmployee.id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    currentCafe.menu = currentCafe.menu.filter(
      (item) => item.id !== req.params.id
    );
    await currentCafe.save();

    res.status(202).json({ message: 'Remove successfully.' });
  }
);

router.get('/menu', async (_req: Request, res: Response) => {
  const menu = await MenuItem.find({});

  res.status(200).json(menu);
});

export default router;

import { Request, Response, Router } from 'express';

import { Table } from '../models/table';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('tables');

  const currentCafeTables = currentCafe?.tables;

  res.status(200).json(currentCafeTables);
});

router.post('/', async (req: Request, res: Response) => {
  const currentCafe = req.cafe;

  const existingTables = await Table.find({});

  const newTable = await Table.create({
    name: `Table ${existingTables.length + 1}`,
    orders: []
  });

  currentCafe?.tables.concat(newTable.id);
  await currentCafe?.save();

  res.status(201).json(newTable);
});

export default router;

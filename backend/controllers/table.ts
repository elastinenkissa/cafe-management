import { Request, Response, Router } from 'express';

import { Table } from '../models/table';

import { getCurrentCafe } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('tables');

  const currentCafeTables = currentCafe?.tables;

  if (!currentCafeTables) {
    throw new Error('No tables found.');
  }

  res.status(200).json(currentCafeTables);
});

router.post('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = req.cafe;

  const existingTables = await Table.find({});

  if (!existingTables) {
    throw new Error('No tables found.');
  }

  const newTable = await Table.create({
    name: `Table ${existingTables.length + 1}`,
    orders: []
  });

  currentCafe?.tables.concat(newTable.id);
  await currentCafe?.save();

  res.status(201).json(newTable);
});

export default router;

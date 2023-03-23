import { Request, Response, Router } from 'express';

import { Table } from '../models/table';
import { Order } from '../models/order';

import { getCurrentCafe } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('tables');

  const currentCafeTables = currentCafe?.tables;

  if (!currentCafeTables) {
    return res.status(404).json({ message: 'No tables found.' });
  }

  res.status(200).json(currentCafeTables);
});

router.post('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = req.cafe!;

  const existingTables = currentCafe?.tables;

  const newTable = await Table.create({
    name: `Table ${existingTables ? existingTables.length + 1 : 1}`
  });

  currentCafe.tables = currentCafe.tables.concat(newTable.id);
  await currentCafe?.save();

  res.status(201).json(newTable);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Table.findByIdAndDelete(req.params.id);

  await Order.deleteMany({ table: req.params.id });

  res.status(200).json({ message: 'Removed successfully.' });
});

router.patch('/:id', async (req: Request, res: Response) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    return res.status(404).json({ message: 'Table not found.' });
  }

  const newOrder = await Order.create({
    name: req.body.orderName,
    price: req.body.orderPrice,
    table: req.params.id
  });

  table.orders = table.orders.concat(newOrder.id);
  await table.save();

  res.status(201).json(newOrder);
});

router.delete('/:id/:orderId', async (req: Request, res: Response) => {
  await Table.updateOne(
    {
      _id: req.params.id
    },
    { $pull: { orders: req.params.orderId } }
  );

  await Order.findByIdAndDelete(req.params.orderId);

  res.status(200).json({ message: 'Order cancelled successfully.' });
});

export default router;

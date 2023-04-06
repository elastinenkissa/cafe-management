import { Request, Response, Router } from 'express';

import { Table } from '../models/table';
import { Order } from '../models/order';
import { Cafe } from '../models/cafe';

import { getCurrentCafe, getEmployee } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('tables');

  const currentCafeTables = currentCafe?.tables;

  if (!currentCafeTables) {
    return res.status(404).json({ message: 'No tables found.' });
  }

  res.status(200).json(currentCafeTables);
});

router.get(
  '/:id',
  getCurrentCafe,
  async (req: Request<{ id: string }>, res: Response) => {
    const tables = (await req.cafe!.populate('tables')).tables;

    const table = tables.find((table) => table.id === req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found.' });
    }

    const orders = await Order.find({ table: table.id });

    res.status(200).json(orders);
  }
);

router.post(
  '/',
  [getCurrentCafe, getEmployee],
  async (req: Request, res: Response) => {
    const currentCafe = req.cafe!;

    const tablesNumber = currentCafe.tables.length;

    const newTable = await Table.create({
      name: `Table ${tablesNumber + 1}`
    });

    currentCafe.tables = currentCafe.tables.concat(newTable.id);
    await currentCafe?.save();

    res.status(201).json(newTable);
  }
);

router.delete(
  '/:id',
  [getCurrentCafe, getEmployee],
  async (
    req: Request<{ id: string }, {}, {}, { cafe: string }>,
    res: Response
  ) => {
    const currentCafe = req.cafe!;

    await Table.findByIdAndDelete(req.params.id);

    await Cafe.findByIdAndUpdate(currentCafe.id, {
      $pull: { tables: req.params.id }
    });

    await Order.deleteMany({ table: req.params.id });

    res.status(200).json({ message: 'Removed successfully.' });
  }
);

router.patch(
  '/:id/addOrder',
  getEmployee,
  async (req: Request<{ id: string }>, res: Response) => {
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
  }
);

router.patch(
  '/:id/removeOrders',
  getEmployee,
  async (req: Request<{ id: string }>, res: Response) => {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found.' });
    }

    await Order.deleteMany({ table: table.id });

    table.orders = [];
    await table.save();

    res.status(201).json({ message: 'Orders removed succesfully.' });
  }
);

router.delete(
  '/:tableId/:orderId',
  getEmployee,
  async (req: Request<{ tableId: string; orderId: string }>, res: Response) => {
    await Table.updateOne(
      {
        _id: req.params.tableId
      },
      { $pull: { orders: req.params.orderId } }
    );

    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({ message: 'Order cancelled successfully.' });
  }
);

export default router;

import { Request, Response, Router } from 'express';

import { Table } from '../models/table';
import { Order } from '../models/order';
import { Cafe } from '../models/cafe';

import { getCurrentCafe, getEmployee, userIsOwner } from '../util/middleware';
import { Log } from '../models/log';

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
  [getCurrentCafe, getEmployee, userIsOwner],
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
  [getCurrentCafe, getEmployee, userIsOwner],
  async (
    req: Request<{ id: string }, object, object, { cafe: string }>,
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
  [getCurrentCafe, getEmployee],
  async (req: Request<{ id: string }>, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found.' });
    }

    const newOrder = await Order.create({
      name: req.body.orderName,
      price: req.body.orderPrice,
      table: req.params.id
    });

    await Log.create({
      change: {
        by: currentEmployee.id
      },
      action: 'added',
      from: table.name,
      orders: newOrder.name,
      cafe: currentCafe.id
    });

    table.orders = table.orders.concat(newOrder.id);
    await table.save();

    res.status(201).json(newOrder);
  }
);

router.patch(
  '/:id/removeOrders',
  [getCurrentCafe, getEmployee],
  async (req: Request<{ id: string }>, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found.' });
    }

    const orders = (await table.populate('orders')).orders.map(
      (order) => order.name
    );

    await Log.create({
      change: {
        by: currentEmployee.id
      },
      action: 'removed',
      from: table.name,
      orders,
      cafe: currentCafe.id
    });

    await Order.deleteMany({ table: table.id });

    table.orders = [];
    await table.save();

    res.status(201).json({ message: 'Orders removed succesfully.' });
  }
);

router.delete(
  '/:tableId/:orderId',
  [getCurrentCafe, getEmployee],
  async (req: Request<{ tableId: string; orderId: string }>, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const table = await Table.findById(req.params.tableId);

    if (!table) {
      return res.status(404).json({ message: 'Table not found.' });
    }

    await Log.create({
      change: {
        by: currentEmployee.id
      },
      action: 'canceled',
      from: table.name,
      orders: order.name,
      cafe: currentCafe.id
    });

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

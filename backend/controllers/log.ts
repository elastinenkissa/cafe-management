import { Request, Response, Router } from 'express';

import { Log } from '../models/log';

import { getCurrentCafe, getEmployee } from '../util/middleware';
import { Deptor } from '../models/deptor';
import { OrderType } from '../models/order';
import { Table } from '../models/table';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const cafe = req.cafe!;

  const logs = await Log.find({ cafe: cafe.id });

  res.status(200).json(logs);
});

router.post(
  '/',
  [getEmployee, getCurrentCafe],
  async (
    req: Request<{}, {}, {}, { tableName: string; deptorName: string }>,
    res: Response
  ) => {
    const cafe = req.cafe!;
    const employee = req.employee!;

    const date = new Date();

    const timestamp = `on ${date.toLocaleDateString()} at ${date.getHours()}:${
      date.getMinutes
    }:${date.getSeconds()}`;

    let orders: Array<OrderType>;

    if (req.query.deptorName) {
      const deptor = await Deptor.findOne({
        name: req.query.deptorName,
        cafe: cafe.id
      }).populate('orders');

      if (!deptor) {
        return res.status(404).json({ message: 'Deptor not found.' });
      }

      orders = deptor.orders;
    }

    if (req.query.tableName) {
      const table = await Table.findOne({
        name: req.query.tableName,
        cafe: cafe.id
      }).populate('orders');

      if (!table) {
        return res.status(404).json({ message: 'Table not found.' });
      }

      orders = table.orders;
    }

    const newLog = await Log.create({
      change: {
        by: employee.id,
        timestamp
      },
      from: req.query.tableName ? req.query.tableName : req.query.deptorName,
      cafe: cafe.id,
      orders: orders!
    });

    res.status(201).json(newLog);
  }
);

export default router;

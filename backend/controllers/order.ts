import { Request, Response, Router } from 'express';

import { Table } from '../models/table';
import { Deptor } from '../models/deptor';
import { Order } from '../models/order';

import { getCurrentCafe, getEmployee } from '../util/middleware';
import { Log } from '../models/log';

const router = Router();

router.put(
  '/:id/transfer',
  [getCurrentCafe, getEmployee],
  async (
    req: Request<{ id: string }, object, { newDeptorId: string }>,
    res: Response
  ) => {
    const currentCafe = req.cafe!;
    const currentEmployee = req.employee!;

    const table = await Table.findById(req.params.id);

    const deptor = await Deptor.findById(req.params.id);

    const newDeptor = await Deptor.findById(req.body.newDeptorId);

    if (!newDeptor) {
      return res.status(404).json({ message: 'New deptor not found.' });
    }

    if (table) {
      await Order.updateMany(
        { table: table._id },
        { $set: { deptor: newDeptor._id }, $unset: { table: table._id } }
      );

      const orders = await Order.find({ deptor: newDeptor._id });

      newDeptor.orders = orders;
      await newDeptor.save();

      const orderNames = orders.map((order) => order.name);

      await Log.create({
        change: {
          by: currentEmployee.id
        },
        cafe: currentCafe.id,
        from: table.name,
        action: 'transferred',
        to: newDeptor.name,
        orders: orderNames
      });

      table.orders = [];
      await table.save();
      return res.status(201).json({ message: 'Transfer successful.' });
    }

    if (deptor) {
      await Order.updateMany(
        { deptor: deptor._id },
        { $set: { deptor: newDeptor._id } }
      );
      const orders = await Order.find({ deptor: newDeptor._id });

      newDeptor.orders = orders;
      await newDeptor.save();

      const orderNames = orders.map((order) => order.name);

      await Log.create({
        change: {
          by: currentEmployee.id
        },
        cafe: currentCafe.id,
        from: deptor.name,
        action: 'transferred',
        to: newDeptor.name,
        orders: orderNames
      });

      await Deptor.findByIdAndDelete(req.params.id);
      return res.status(201).json({ message: 'Transfer successful.' });
    }

    res.status(400).json({ message: 'Unknown error.' });
  }
);

export default router;

import { Request, Response, Router } from 'express';

import { Table } from '../models/table';
import { Deptor } from '../models/deptor';
import { Order } from '../models/order';

import { getEmployee } from '../util/middleware';

const router = Router();

router.put(
  '/:id/transfer',
  getEmployee,
  async (
    req: Request<{ id: string }, {}, {}, { newDeptorId: string }>,
    res: Response
  ) => {
    const table = await Table.findById(req.params.id);

    const deptor = await Deptor.findById(req.params.id);

    const newDeptor = await Deptor.findById(req.query.newDeptorId);

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

      await Deptor.findByIdAndDelete(req.params.id);
      return res.status(201).json({ message: 'Transfer successful.' });
    }

    res.status(400).json({ message: 'Unknown error.' });
  }
);

export default router;

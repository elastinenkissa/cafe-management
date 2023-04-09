import { Request, Response, Router } from 'express';

import { Deptor } from '../models/deptor';
import { Order } from '../models/order';
import { Log } from '../models/log';

import { getCurrentCafe, getEmployee } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('deptors');

  const currentCafeDeptors = currentCafe?.deptors;

  if (!currentCafeDeptors) {
    return res.status(404).json({ message: 'No deptors found.' });
  }

  res.status(200).json(currentCafeDeptors);
});

router.get(
  '/:id',
  getCurrentCafe,
  async (req: Request<{ id: string }>, res: Response) => {
    const deptors = (await req.cafe!.populate('deptors')).deptors;

    const deptor = deptors.find((deptor) => deptor.id === req.params.id);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor not found.' });
    }

    const orders = await Order.find({ deptor: deptor.id });

    res.status(200).json(orders);
  }
);

router.post(
  '/',
  [getCurrentCafe, getEmployee],
  async (req: Request<object, object, { name: string }>, res: Response) => {
    const currentCafe = req.cafe!;

    const newDeptor = await Deptor.create({
      name: req.body.name
    });

    currentCafe.deptors = currentCafe.deptors.concat(newDeptor.id);
    await currentCafe?.save();

    res.status(201).json(newDeptor);
  }
);

router.delete(
  '/:id',
  [getCurrentCafe, getEmployee],
  async (req: Request<{ id: string }>, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    const deptor = await Deptor.findById(req.params.id);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor does not exist.' });
    }

    const orders = (await deptor.populate('orders')).orders.map(
      (order) => order.name
    );

    if (deptor.orders.length > 0) {
      await Log.create({
        change: {
          by: currentEmployee.id
        },
        action: 'removed',
        from: deptor.name,
        orders,
        cafe: currentCafe.id
      });
    }

    await Deptor.findByIdAndDelete(deptor.id);

    await Order.deleteMany({ deptor: req.params.id });

    await currentCafe.updateOne({ $pull: { deptors: req.params.id } });

    res.status(200).json({ message: 'Removed successfully.' });
  }
);

router.patch(
  '/:id/addOrder',
  [getCurrentCafe, getEmployee],
  async (req: Request<{ id: string }>, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    const deptor = await Deptor.findById(req.params.id);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor not found.' });
    }

    const newOrder = await Order.create({
      name: req.body.orderName,
      price: req.body.orderPrice,
      deptor: req.params.id
    });

    await Log.create({
      change: {
        by: currentEmployee.id
      },
      action: 'added',
      from: deptor.name,
      orders: newOrder.name,
      cafe: currentCafe.id
    });

    deptor.orders = deptor.orders.concat(newOrder.id);
    await deptor.save();

    res.status(201).json(newOrder);
  }
);

router.delete(
  '/:deptorId/:orderId',
  [getCurrentCafe, getEmployee],
  async (
    req: Request<{ deptorId: string; orderId: string }>,
    res: Response
  ) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const deptor = await Deptor.findById(req.params.deptorId);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor not found.' });
    }

    await Log.create({
      change: {
        by: currentEmployee.id
      },
      action: 'canceled',
      from: deptor.name,
      orders: order.name,
      cafe: currentCafe.id
    });

    await Deptor.updateOne(
      {
        _id: req.params.deptorId
      },
      { $pull: { orders: req.params.orderId } }
    );

    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({ message: 'Order cancelled successfully.' });
  }
);

export default router;

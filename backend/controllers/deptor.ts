import { Request, Response, Router } from 'express';

import { Deptor } from '../models/deptor';
import { Order, OrderType } from '../models/order';

import { getCurrentCafe } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('deptors');

  const currentCafeDeptors = currentCafe?.deptors;

  if (!currentCafeDeptors) {
    return res.status(404).json({ message: 'No deptors found.' });
  }

  res.status(200).json(currentCafeDeptors);
});

router.post(
  '/',
  getCurrentCafe,
  async (req: Request<{}, {}, { name: string }>, res: Response) => {
    const currentCafe = req.cafe!;

    const newDeptor = await Deptor.create({
      name: req.body.name
    });

    currentCafe.deptors = currentCafe.deptors.concat(newDeptor.id);
    await currentCafe?.save();

    res.status(201).json(newDeptor);
  }
);

router.delete('/:id', async (req: Request, res: Response) => {
  await Deptor.findByIdAndDelete(req.params.id);

  await Order.deleteMany({ table: req.params.id });

  res.status(200).json({ message: 'Removed successfully.' });
});

router.patch(
  '/:id/addOrder',
  async (req: Request<{ id: string }>, res: Response) => {
    const deptor = await Deptor.findById(req.params.id);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor not found.' });
    }

    const newOrder = await Order.create({
      name: req.body.orderName,
      price: req.body.orderPrice,
      table: req.params.id
    });

    deptor.orders = deptor.orders.concat(newOrder.id);
    await deptor.save();

    res.status(201).json(newOrder);
  }
);

router.patch(
  '/:id/addOrders',
  async (
    req: Request<{ id: string }, {}, { orders: Array<OrderType> }>,
    res: Response
  ) => {
    const deptor = await Deptor.findById(req.params.id);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor not found.' });
    }

    deptor.orders = req.body.orders;
    await deptor.save();

    res.status(201).json({ message: 'Orders added sucessfully.' });
  }
);

router.delete(
  '/:id/:orderId',
  async (
    req: Request<{ deptorId: string; orderId: string }>,
    res: Response
  ) => {
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

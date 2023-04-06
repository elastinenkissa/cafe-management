import { Request, Response, Router } from 'express';

import { Deptor } from '../models/deptor';
import { Order, OrderType } from '../models/order';

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

router.delete(
  '/:id',
  [getCurrentCafe, getEmployee],
  async (req: Request, res: Response) => {
    const currentCafe = req.cafe!;

    await Deptor.findByIdAndDelete(req.params.id);

    await Order.deleteMany({ deptor: req.params.id });

    currentCafe.deptors = currentCafe.deptors.filter(
      (deptor) => deptor.id !== req.params.id
    );
    await currentCafe.save();

    res.status(200).json({ message: 'Removed successfully.' });
  }
);

router.patch(
  '/:id/addOrder',
  getEmployee,
  async (req: Request<{ id: string }>, res: Response) => {
    const deptor = await Deptor.findById(req.params.id);

    if (!deptor) {
      return res.status(404).json({ message: 'Deptor not found.' });
    }

    const newOrder = await Order.create({
      name: req.body.orderName,
      price: req.body.orderPrice,
      deptor: req.params.id
    });

    deptor.orders = deptor.orders.concat(newOrder.id);
    await deptor.save();

    res.status(201).json(newOrder);
  }
);

router.patch(
  '/:id/addOrders',
  getEmployee,
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
  getEmployee,
  async (
    req: Request<{ deptorId: string; orderId: string }>,
    res: Response
  ) => {
    //@ts-ignore
    const owner = req.owner;

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

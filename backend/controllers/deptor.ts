import { Request, Response, Router } from 'express';

import { Deptor } from '../models/deptor';
import { getCurrentCafe, getEmployee } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const cafe = await req.cafe!.populate('deptors');

  const deptors = cafe.deptors;

  if (!deptors) {
    return res.status(404).json({ message: 'No deptors found.' });
  }

  res.status(200).json(deptors);
});

router.post(
  '/',
  getEmployee,
  async (req: Request<{}, {}, { name: string }>, res: Response) => {
    const newDeptor = new Deptor({
      name: req.body.name,
      orders: []
    });

    await newDeptor.save();

    res.status(201).json(newDeptor);
  }
);

export default router;

import { Request, Response, Router } from 'express';

import { Deptor, DeptorType } from '../models/deptor';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const deptors = await Deptor.find({});

  if (!deptors) {
    return res.status(404).json({ message: 'No deptors found.' });
  }

  res.status(200).json(deptors);
});

router.get('/', async (req: Request<DeptorType>, res: Response) => {
  const newDeptor = new Deptor({
    name: req.body.name,
    orders: []
  });

  await newDeptor.save();

  res.status(201).json(newDeptor);
});

export default router;

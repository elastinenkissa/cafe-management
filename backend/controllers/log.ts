import { Request, Response, Router } from 'express';

import { Log } from '../models/log';

import { getCurrentCafe } from '../util/middleware';

const router = Router();

router.get('/', getCurrentCafe, async (req: Request, res: Response) => {
  const cafe = req.cafe!;

  const logs = await Log.find({ cafe: cafe.id }).populate([
    'change.by',
    'orders'
  ]);

  if (!logs) {
    return res.status(404).json({ message: 'Logs not found.' });
  }

  res.status(200).json(logs);
});

export default router;

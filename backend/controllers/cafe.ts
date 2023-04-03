import { Request, Response, Router } from 'express';

import { Cafe } from '../models/cafe';
import { MenuItem } from '../models/menuItem';

import { getCurrentCafe, getEmployee } from '../util/middleware';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const cafes = await Cafe.find({});

  res.status(200).json(cafes);
});

router.post(
  '/',
  getEmployee,
  async (
    req: Request<{}, {}, { name: string; currency: number }>,
    res: Response
  ) => {
    const owner = req.employee!;

    const newCafe = await Cafe.create({
      name: req.body.name,
      currency: req.body.currency,
      owner: owner.id
    });

    owner.cafe = newCafe.id;
    await owner.save();

    res.status(201).json(newCafe);
  }
);

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const cafe = await Cafe.findById(req.params.id).populate(
    'owner',
    '-login -password -token'
  );

  res.status(200).json(cafe);
});

router.get('/menu', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = req.cafe!;

  const menu = (await currentCafe.populate('menu')).menu;

  if (!menu) {
    return res.status(404).json({ message: 'Menu is empty.' });
  }

  res.status(200).json(menu);
});

router.post(
  '/menu',
  [getCurrentCafe, getEmployee],
  async (
    req: Request<{}, {}, { item: string; price: number }>,
    res: Response
  ) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    if (currentCafe.owner.id !== currentEmployee.id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const newMenuItem = await MenuItem.create({
      item: req.body.item,
      price: req.body.price
    });

    currentCafe.menu.concat(newMenuItem.id);
    await currentCafe?.save();

    res.status(201).json(newMenuItem);
  }
);

router.delete(
  '/menu/:id',
  [getCurrentCafe, getEmployee],
  async (req: Request<{ id: string }>, res: Response) => {
    const currentEmployee = req.employee!;
    const currentCafe = req.cafe!;

    if (currentCafe.owner.id !== currentEmployee.id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    currentCafe.menu = currentCafe.menu.filter(
      (item) => item.id !== req.params.id
    );
    await currentCafe.save();

    res.status(202).json({ message: 'Remove successfully.' });
  }
);

router.get('/menu', async (_req: Request, res: Response) => {
  const menu = await MenuItem.find({});

  res.status(200).json(menu);
});

export default router;

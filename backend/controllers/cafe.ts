import { Request, Response, Router } from 'express';

import { Cafe } from '../models/cafe';
import { MenuItem } from '../models/menuItem';

import { getCurrentCafe, getEmployee, userIsOwner } from '../util/middleware';

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

router.get('/menu', getCurrentCafe, async (req: Request, res: Response) => {
  const currentCafe = await req.cafe?.populate('menu');

  const menu = currentCafe?.menu;

  if (!menu) {
    return res.status(404).json({ message: 'Menu is empty.' });
  }

  res.status(200).json(menu);
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const cafe = await Cafe.findById(req.params.id).populate(
    'owner',
    '-username -password -token'
  );

  res.status(200).json(cafe);
});

router.post(
  '/menu',
  [getCurrentCafe, getEmployee, userIsOwner],
  async (
    req: Request<{}, {}, { name: string; price: number }>,
    res: Response
  ) => {
    const currentCafe = req.cafe!;

    const newMenuItem = await MenuItem.create({
      name: req.body.name,
      price: req.body.price
    });

    if (!newMenuItem) {
      return res.status(400).json({ message: 'Failed to create menu item.' });
    }

    currentCafe.menu = currentCafe.menu.concat(newMenuItem.id);
    await currentCafe?.save();

    res.status(201).json(newMenuItem);
  }
);

router.delete(
  '/menu/:id',
  [getCurrentCafe, getEmployee, userIsOwner],
  async (req: Request<{ id: string }>, res: Response) => {
    const currentCafe = await req.cafe!.populate('menu');

    //@ts-ignore
    const owner = req.owner;

    await MenuItem.findByIdAndDelete(req.params.id);

    currentCafe.menu = currentCafe.menu.filter(
      (item) => item.id !== req.params.id
    );
    await currentCafe.save();

    res.status(202).json({ message: 'Remove successfully.' });
  }
);

export default router;

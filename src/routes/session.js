import { Router } from 'express';

import { BadRequestError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.context.me.id,
  ).catch((error) => next(new BadRequestError(error)));

  return res.send(user);
});

export default router;

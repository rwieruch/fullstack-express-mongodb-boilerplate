import { Router } from 'express';

import { BadRequestError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.find().catch(
    (error) => next(new BadRequestError(error)),
  );

  return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId,
  ).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});

router.post('/', async (req, res, next) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    user: req.context.me.id,
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId,
  ).catch((error) => next(new BadRequestError(error)));

  if (message) {
    await message.remove();
  }

  return res.send(message);
});

export default router;

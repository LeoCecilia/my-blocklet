import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';

import { db } from '../model/profile.db';

const routes = Router();

// db operation Documentation: https://www.npmjs.com/package/@nedb/core
routes.post(
  '/',
  // Documentation: https://express-validator.github.io/docs/api/check/#check
  [check('data.name').isString().escape(), check('data.email').isEmail(), check('data.phone').isMobilePhone('zh-CN')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errorMsg: errors.array() });
    }
    const data = req.body.id ? await db.find({ _id: req.body.id }) : [];

    const { name, email, phone } = req.body.data;
    const updatedData = { name, phone, email };
    let result = null;
    if (!data.length) {
      result = await db.insert(updatedData);
    } else {
      const updated = await db.update({ _id: req.body.id }, updatedData, { returnUpdatedDocs: true });
      if (updated.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        result = updated[1];
      }
    }
    return res.json({ data: result });
  },
);

routes.get('/', [check('id').isString().escape()], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errorMsg: errors.array() });
  }
  const data = await db.find({ _id: req.body.id });
  return res.json({ data });
});

export default routes;
export { routes };

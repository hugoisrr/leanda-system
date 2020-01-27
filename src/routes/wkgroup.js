import { Router } from 'express';
import { check } from 'express-validator';

import { createWorkStationGroup } from '../controllers/wkgroup.controller';

const router = Router();

router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('wkSGroupNum', 'Please add a WorkStationGroup number')
      .not()
      .isEmpty()
  ],
  createWorkStationGroup
);

export default router;

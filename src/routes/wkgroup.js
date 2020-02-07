import { Router } from 'express';
import { check } from 'express-validator';

import {
  createWorkStationGroup,
  showListWorkStationGroups,
  showWorkStationByID,
  editWorkStationGroup
} from '../controllers/wkgroup.controller';

const router = Router();

router
  .post(
    '/wsgroups',
    [
      check('name', 'Please add a name')
        .not()
        .isEmpty(),
      check('kostenstelle', 'Please add a WorkStationGroup number')
        .not()
        .isEmpty()
    ],
    createWorkStationGroup
  )
  .get('/wsgroups', showListWorkStationGroups)
  .get('/wsgroups/:id', showWorkStationByID)
  .put('/wsgroups/:id', editWorkStationGroup);

export default router;

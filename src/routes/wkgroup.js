import { Router } from 'express';
import { check } from 'express-validator';

import {
  createWorkStationGroup,
  showListWorkStationGroups,
  showWorkStationGroupByID,
  editWorkStationGroupByID
} from '../controllers/wkgroup.controller';

const router = Router();

router
  .route('/wsgroups')
  .post(
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
  .get(showListWorkStationGroups);

router
  .route('/wsgroups/:id')
  .get(showWorkStationGroupByID)
  .put(editWorkStationGroupByID);

export default router;

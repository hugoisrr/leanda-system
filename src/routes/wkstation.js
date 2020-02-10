import { Router } from 'express';
import { check } from 'express-validator';

import {
  createWorkStation,
  showListWorkStations,
  showWorkStationByID,
  editWorkStationByID
} from '../controllers/wkstation.controller';

const router = Router();

router
  .route('/wkstation')
  .post(
    [
      check('name', 'Please add a name')
        .not()
        .isEmpty(),
      check('WSnum', 'Please add a Workstation number')
        .not()
        .isEmpty(),
      check('type', 'Please select a type')
        .not()
        .isEmpty()
    ],
    createWorkStation
  )
  .get(showListWorkStations);

router
  .route('/wkstation/:id')
  .get(showWorkStationByID)
  .put(editWorkStationByID);

export default router;

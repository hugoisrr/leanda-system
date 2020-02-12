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
      check('name', 'Please add a name').notEmpty(),
      check('WSnum', 'Please add a Workstation number').notEmpty(),
      check('type', 'Please select a type').notEmpty()
    ],
    createWorkStation
  )
  .get(showListWorkStations);

router
  .route('/wkstation/:id')
  .get(showWorkStationByID)
  .put(editWorkStationByID);

export default router;

import { Router } from 'express';
import { check } from 'express-validator';

import { createShift, showListShifts } from '../controllers/shift.controller';

const router = Router();

router
  .route('/shift')
  .post(
    [
      check('type', 'Please select a type')
        .notEmpty()
        .isIn(['FS', 'SS', 'NS']),
      check('startTime', 'Please choose a start Time').notEmpty(),
      check('stopTime', 'Please choose a stop Time').notEmpty(),
      check('daysOfWeek', 'Please choose a day')
        .notEmpty()
        .isArray()
        .isIn([0, 1, 2, 3, 4, 5, 6])
    ],
    createShift
  )
  .get(showListShifts);

export default router;

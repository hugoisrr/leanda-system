/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import WorkStationGroup from '../models/WorkstationGroup';

export async function createWorkStationGroup(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Saving a new WorkStationGroup
  const { name, wkSGroupNum } = req.body;

  try {
    const newWSGroup = new WorkStationGroup({
      name,
      wkSGroupNum
    });

    const wsGroup = await newWSGroup.save();

    return res.status(200).json({
      message: 'Group created',
      wsGroup
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      // console.error('Error Validating!', err);
      res.status(422).json(err);
    } else {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import Shift from '../models/Shift';

export async function createShift(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { type, startTime, stopTime, daysOfWeek } = req.body;

  //   Saving a new Shift
  try {
    const newShift = new Shift({
      type,
      startTime,
      stopTime,
      daysOfWeek
    });

    const shift = await newShift.save();

    return res.status(200).json({
      message: 'Shift created',
      shift
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
}

export async function showListShifts(req, res) {
  try {
    const shiftList = await Shift.find().sort({ createdAt: -1 });
    return res.json(shiftList);
    // TODO Display duration virtual method of each Shift
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

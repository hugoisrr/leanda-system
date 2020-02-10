/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import slugify from 'slugify';
import WorkStationGroup from '../models/WorkstationGroup';

export async function createWorkStationGroup(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, kostenstelle } = req.body;

  const wkSGroupExists = await WorkStationGroup.findOne({ name });
  if (wkSGroupExists)
    return res.status(400).json({ message: 'Workstation Group exists.' });

  // Saving a new WorkStationGroup
  try {
    const newWSGroup = new WorkStationGroup({
      name,
      kostenstelle
    });

    const wsGroup = await newWSGroup.save();

    return res.status(200).json({
      message: 'WorkStation Group created',
      wsGroup
    });
  } catch (err) {
    if (err.name === 'MongoError') {
      console.error(err.message);
      return res.status(400).json({ message: 'Kostenstelle exists.' });
    }
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function showListWorkStationGroups(req, res) {
  try {
    const wkSGroups = await WorkStationGroup.find().sort({ createdAt: -1 });
    return res.json(wkSGroups);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

export async function showWorkStationGroupByID(req, res) {
  try {
    const wkSGroup = await WorkStationGroup.findById(req.params.id);
    if (!wkSGroup) {
      return res.status(404).json({ message: 'WorkStationGroup not found' });
    }

    return res.json(wkSGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'WorkStationGroup not found' });
    }
    return res.status(500).send('Server Error');
  }
}

export async function editWorkStationGroupByID(req, res) {
  const { name, kostenstelle } = req.body;

  let wkSGroup = await WorkStationGroup.findById(req.params.id);

  if (!wkSGroup)
    return res.status(404).json({ message: 'WorkStationGroup not found' });

  // Build WorkStationGroup object
  const wkSGroupFields = {};
  if (name) {
    wkSGroupFields.name = name;
    wkSGroupFields.slug = slugify(name.toLowerCase());
  }
  if (kostenstelle) wkSGroupFields.kostenstelle = kostenstelle;

  try {
    wkSGroup = await WorkStationGroup.findByIdAndUpdate(
      req.params.id,
      { $set: wkSGroupFields },
      { new: true }
    );

    return res.json(wkSGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'WorkStationGroup not found' });
    }
    res.status(500).send('Server Error');
  }
}

// TODO move a WorkStation to another WorkstationGroup; remove and eliminate a WorkstationGroup if empty

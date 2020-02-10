/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import slugify from 'slugify';
import WorkStation from '../models/Workstation';
import WorkstationGroup from '../models/WorkstationGroup';
import Picture from '../models/Picture';

export async function createWorkStation(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, WSnum, type } = req.body;

  const wkSExists = await WorkStation.findOne({ name });
  if (wkSExists)
    return res.status(400).json({ message: 'Workstation exists.' });

  // Saving a new WorkStation
  try {
    const newWKS = new WorkStation({
      name,
      WSnum,
      type
    });

    const wkStation = await newWKS.save();

    return res.status(200).json({
      message: 'Workstation created',
      wkStation
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function showListWorkStations(req, res) {
  try {
    const wkSList = await WorkStation.find().sort({ createdAt: -1 });
    return res.json(wkSList);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

export async function showWorkStationByID(req, res) {
  try {
    const wkStation = await WorkStation.findById(req.params.id);
    if (!wkStation)
      return res.status(404).json({ message: 'WorkStation not found.' });

    return res.json(wkStation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'WorkStation not found' });
    }
    return res.status(500).send('Server Error');
  }
}

export async function editWorkStationByID(req, res) {
  const {
    name,
    WSnum,
    type,
    inUse,
    locked,
    workStationGroup,
    picture
  } = req.body;

  let wkStation = await WorkStation.findById(req.params.id);
  if (!wkStation)
    return res.status(404).json({ message: 'WorkStation not found' });

  // Build WorkStation object
  const wkStationFields = {};
  if (name) {
    wkStationFields.name = name;
    wkStationFields.slug = slugify(name.toLowerCase());
  }
  if (WSnum) wkStationFields.WSnum = WSnum;
  if (type) wkStationFields.type = type;
  if (inUse === undefined) {
    wkStationFields.inUse = wkStation.inUse;
  } else if (inUse || !inUse) {
    wkStationFields.inUse = inUse;
  }
  if (locked === undefined) {
    wkStationFields.locked = wkStation.locked;
  } else if (locked || !locked) {
    wkStationFields.locked = locked;
  }
  // NOTE Relationship between WorkStation and WorkStation Group
  if (workStationGroup) {
    const wkGroupFound = await WorkstationGroup.findById(workStationGroup);
    if (!wkGroupFound)
      return res.status(404).json({ message: 'WorkStation Group not Found' });
    wkStationFields.workStationGroup = wkGroupFound.id;
    wkGroupFound.workstations.unshift(wkStation.id);
    // TODO before saving verify if the workstation is not saved in another group
    await wkGroupFound.save();
  }
  if (picture) {
    const pictureFound = await Picture.findById(picture);
    if (!pictureFound)
      return res.status(404).json({ message: 'Picture not found' });
    wkStationFields.picture = pictureFound.id;
  }

  try {
    wkStation = await WorkStation.findByIdAndUpdate(
      req.params.id,
      { $set: wkStationFields },
      { new: true }
    );

    return res.json(wkStation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'WorkStation not found' });
    }
    res.status(500).send('Server Error');
  }
}

// TODO add shift to a WorkStation

// TODO add AVO to a WorkStation

// TODO add state to a WorkStation

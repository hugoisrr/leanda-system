/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import fs from 'fs-extra';
import path from 'path';

import Picture from '../models/Picture';

export async function getPictures(req, res) {
  try {
    const pictures = await Picture.find();
    return res.json(pictures);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

export async function createPicture(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, description } = req.body;

  // Verifies if title exists
  const picExists = await Picture.findOne({ title });
  if (picExists) return res.status(400).json({ message: 'Title exits' });

  // Saving Picture
  try {
    const newPicture = { title, description, imagePath: req.file.path };
    const picture = new Picture(newPicture);
    await picture.save();
    return res.json({
      message: 'Picture successfully saved',
      picture
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function getPictureByID(req, res) {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) return res.status(404).json({ message: 'Picture not found' });

    return res.json(picture);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Picture not found' });
    }
    return res.status(500).send('Server Error');
  }
}

export async function deletePictureByID(req, res) {
  try {
    const picture = await Picture.findByIdAndRemove(req.params.id);
    if (picture) {
      await fs.unlink(path.resolve(picture.imagePath));
    }
    return res.json({ message: 'Picture Deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Picture not found' });
    }
    return res.status(500).send('Server Error');
  }
}

export async function editPictureByID(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPicture = await Picture.findByIdAndUpdate(id, {
      title,
      description
    });
    return res.json({
      message: 'Successfully updated',
      updatedPicture
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Picture not found' });
    }
    return res.status(500).send('Server Error');
  }
}

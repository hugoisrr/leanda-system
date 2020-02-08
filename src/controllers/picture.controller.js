/* eslint-disable import/prefer-default-export */
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
  const { title, description } = req.body;
  const newPicture = { title, description, imagePath: req.file.path };
  const picture = new Picture(newPicture);
  await picture.save();
  return res.json({
    message: 'Picture successfully saved',
    picture
  });
}

export async function getPicture(req, res) {
  const { id } = req.params;
  const picture = await Picture.findById(id);
  return res.json(picture);
}

export async function deletePicture(req, res) {
  const { id } = req.params;
  const picture = await Picture.findByIdAndRemove(id);
  if (picture) {
    await fs.unlink(path.resolve(picture.imagePath));
  }
  return res.json({ message: 'Picture Deleted' });
}

export async function updatePicture(req, res) {
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
}

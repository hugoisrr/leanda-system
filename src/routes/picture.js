import { Router } from 'express';
import { check } from 'express-validator';

import {
  createPicture,
  getPictures,
  getPictureByID,
  deletePictureByID,
  editPictureByID
} from '../controllers/picture.controller';

import multer from '../libs/multer';

const router = Router();

// TODO Improve upload of pictures, and validations
router
  .route('/pictures')
  .post(
    multer.single('image'),
    [
      check('image', 'Please select an image').isEmpty(),
      check('title', 'Please add a title')
        .not()
        .isEmpty()
    ],
    createPicture
  )
  .get(getPictures);

router
  .route('/pictures/:id')
  .get(getPictureByID)
  .delete(deletePictureByID)
  .put(editPictureByID);

export default router;

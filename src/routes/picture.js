import { Router } from 'express';

import {
  createPicture,
  getPictures,
  getPicture,
  deletePicture,
  updatePicture
} from '../controllers/picture.controller';

import multer from '../libs/multer';

const router = Router();

router
  .route('/pictures')
  .post(multer.single('image'), createPicture)
  .get(getPictures);

router
  .route('/pictures/:id')
  .get(getPicture)
  .delete(deletePicture)
  .put(updatePicture);

export default router;

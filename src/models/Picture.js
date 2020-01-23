import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const pictureSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 3,
      max: 28
    },
    slug: {
      type: String,
      slug: 'title'
    },
    description: {
      type: String,
      trim: true,
      min: 3,
      max: 32
    },
    imagePath: {
      type: String,
      unique: true,
      required: true,
      min: 4
    }
  },
  {
    timestamps: true
  }
);

export default model('Picture', pictureSchema);

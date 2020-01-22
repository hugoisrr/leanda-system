import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-url-slugs';

mongoose.plugin(slug);

const workStationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 4
    },
    slug: {
      type: String,
      slug: 'name',
      required: true
    },
    workStationType: {
      type: String,
      enum: ['TF', 'HT'],
      default: 'TF'
    },
    inUse: {
      type: Boolean,
      required: true,
      default: false
    },
    locked: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('WorkStation', workStationSchema);

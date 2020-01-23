import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const workStationSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 4
    },
    slug: {
      type: String,
      slug: 'name'
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
    },
    shifts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Shift'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('WorkStation', workStationSchema);

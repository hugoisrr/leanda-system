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
    WSnum: {
      type: String,
      unique: true,
      required: true,
      min: 2
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
      default: true
    },
    unlocked: {
      type: Boolean,
      default: true
    },
    shifts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Shift'
      }
    ],
    AVOs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AVO'
      }
    ],
    states: [
      {
        type: Schema.Types.ObjectId,
        ref: 'State'
      }
    ],
    workStationGroup: {
      type: Schema.Types.ObjectId,
      ref: 'WorkStationGroup'
    },
    picture: {
      type: Schema.Types.ObjectId,
      ref: 'Picture'
    }
  },
  {
    timestamps: true
  }
);

// TODO create live state with virtual method

export default model('WorkStation', workStationSchema);

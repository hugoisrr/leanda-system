import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const stateSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 3
    },
    slug: {
      type: String,
      slug: 'name'
    },
    locked: {
      type: Boolean,
      default: false
    },
    workstations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'WorkStation'
      }
    ],
    stateGroup: {
      type: Schema.Types.ObjectId,
      ref: 'StateGroup'
    }
  },
  {
    timestamps: true
  }
);

export default model('State', stateSchema);

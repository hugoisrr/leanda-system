import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const stateGroupSchema = new Schema(
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
    colorHex: {
      type: String,
      default: '#6200EE'
    },
    states: [
      {
        type: Schema.Types.ObjectId,
        ref: 'State'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('StateGroup', stateGroupSchema);

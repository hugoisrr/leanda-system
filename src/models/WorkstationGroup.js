import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const wkGroupSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 3
    },
    kostenstelle: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 2
    },
    slug: {
      type: String,
      slug: 'name'
    },
    workstations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'WorkStation'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('WorkStationGroup', wkGroupSchema);

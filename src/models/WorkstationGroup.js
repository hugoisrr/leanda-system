import mongoose, { Schema, model } from 'mongoose';
import slug from 'mongoose-url-slugs';

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
    slug: {
      type: String,
      slug: 'name',
      required: true
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

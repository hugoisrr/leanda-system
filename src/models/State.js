import { Schema, model } from 'mongoose';

const stateSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 3
    },
    inUse: {
      type: Boolean,
      default: true
    },
    stateGroup: {
      type: Schema.Types.ObjectId,
      ref: 'StateGroup'
    },
    colorHex: {
      type: String,
      default: '#6200EE'
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

export default model('State', stateSchema);

import { Schema, model } from 'mongoose';

const shiftSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3
    },
    startTime: {
      type: Date,
      required: true
    },
    stopTime: {
      type: Date,
      required: true
    },
    daysOfWeek: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6],
      required: true
    },
    workStation: {
      type: Schema.Types.ObjectId,
      ref: 'WorkStation',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// TODO create virtual function to get duration Time
// TODO create getter function to get only time from startTime and stopTime

export default model('Shift', shiftSchema);

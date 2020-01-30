/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const shiftSchema = new Schema(
  {
    shiftType: {
      type: [String],
      enum: ['FS', 'SS', 'NS'],
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    stopTime: {
      type: Date,
      required: true
    },
    workStation: {
      type: Schema.Types.ObjectId,
      ref: 'WorkStation',
      required: true
    },
    daysOfWeek: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// TODO create getter function to get only time from startTime and stopTime

shiftSchema.virtual('durationMin').get(function() {
  const diff = Math.abs(this.stopTime - this.startTime);
  return Math.floor(diff / 1000 / 60);
});

export default model('Shift', shiftSchema);

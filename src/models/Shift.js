/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const shiftSchema = new Schema(
  {
    type: {
      type: String,
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
    daysOfWeek: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6],
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

// NOTE durationMin virtual method between startTime and stopTime
shiftSchema.virtual('durationMin').get(function() {
  const diff = Math.abs(this.stopTime - this.startTime);
  return Math.floor(diff / 1000 / 60);
});

// NOTE validate if startTime is not geater than stopTime
shiftSchema.pre('validate', function(next) {
  if (this.startTime > this.stopTime) {
    next(new Error('Stop Time must be greater than Start Time'));
  } else {
    next();
  }
});

export default model('Shift', shiftSchema);

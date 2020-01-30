/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const sequenceSchema = new Schema({
  startTS: Date,
  stopTS: Date,
  AVO: {
    type: Schema.Types.ObjectId,
    ref: 'AVO'
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'State'
  }
});

sequenceSchema.virtual('durationMin').get(function() {
  const diff = Math.abs(this.stopTS - this.startTS);
  return Math.floor(diff / 1000 / 60);
});

export default model('Sequence', sequenceSchema);

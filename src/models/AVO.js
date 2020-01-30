import { Schema, model } from 'mongoose';

const AVOSchema = new Schema(
  {
    AVOnum: {
      type: String,
      required: true
    },
    FAUF: {
      type: Schema.Types.ObjectId,
      ref: 'FAUF'
    },
    // TODO add list of references of Sequences
    workstation: {
      type: Schema.Types.ObjectId,
      ref: 'WorkStation'
    },
    chargeNum: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// TODO create live state with virtual method

export default model('AVO', AVOSchema);

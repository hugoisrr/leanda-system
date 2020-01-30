import { Schema, model } from 'mongoose';

const FAUFSchema = new Schema(
  {
    FAUFnum: {
      type: String,
      required: true,
      trim: true,
      min: 2
    },
    AVOs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AVO'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('FAUF', FAUFSchema);

const mongoose = require('mongoose')
const Workstation = mongoose.Workstation;
const StateLog = mongoose.StateLog;

const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  desc: String,
  workstationID: { type: Schema.Types.ObjectId, ref: 'Workstation' },
  currentState: { type: Schema.Types.ObjectId, ref: 'StateLog' },
  created: { type: Date, default: Date.now },
  targetAmount: Number,
  produced: {
      good: { type: Number, default: 0},
      bad: { type: Number, default: 0 }
  }
})

module.exports = mongoose.model('Order', orderSchema)
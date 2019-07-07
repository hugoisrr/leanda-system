const mongoose = require('mongoose')
const State = mongoose.State;
const Order = mongoose.Order;

const statelogSchema = new mongoose.Schema({
  stateID: { type: Schema.Types.ObjectId, ref: 'State' },
  orderID: { type: Schema.Types.ObjectId, ref: 'Order' },
  start: { type: Date, default: Date.now },
  stop: { type: Date, default: Date.now }
})

module.exports = mongoose.model('StateLog', statelogSchema)
const mongoose = require('mongoose')
const State = mongoose.State;

const workstationSchema = new mongoose.Schema({
  workstationID: { type: String, required: true, unique: true },
  WorkstationName: { type: String, required: true },
  desc: String,
  // StateList: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  appFlowSettings: {enum: ['barcode', 'qr','manually','indi']}
})

module.exports = mongoose.model('Workstation', workstationSchema)
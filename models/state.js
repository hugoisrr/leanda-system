const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
  stateID: { type: String, required: true, unique: true },
  StateName: { type: String, required: true },
  comment: String,
  code: { type: Number, required: true },
  color: String
})

module.exports = mongoose.model('State', stateSchema)
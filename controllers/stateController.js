// External Dependancies
const boom = require('boom')

// Get Data Models
const State = require('../models/state')

// Get all states 
exports.getStates = async (req, reply) => {
    try {
      const state = await State.find();
      return state
    } catch (err) {
      throw boom.boomify(err)
    }
  }

// Get single state by stateID
exports.getSingleState = async (req, reply) => {
  try {
    const stateID = req.params.stateID
    const state = await State.findOne({ stateID: stateID});
    return state
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new state
exports.addState = async (req, reply) => {
  try {
    const state = new State(req.body)
    return state.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing state
exports.updateState = async (req, reply) => {
  try {
    const stateID = req.params.stateID
    const state = req.body
    const { ...updateData } = state
    const update = await State.findOneAndUpdate({stateID: stateID}, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a state
exports.deleteState = async (req, reply) => {
  try {
    const stateID = req.params.stateID
    const state = await State.findOneAndRemove({ stateID: stateID});
    return state
  } catch (err) {
    throw boom.boomify(err)
  }
}
// External Dependancies
const boom = require('boom')

// Get Data Models
const Workstation = require('../models/workstation')

// Get all workstation 
exports.getWorkstation = async (req, reply) => {
    try {
      const workstation = await Workstation.find();
      return workstation
    } catch (err) {
      throw boom.boomify(err)
    }
  }

// Get single workstation by workstationID
exports.getSingleWorkstation = async (req, reply) => {
  try {
    const workstationID = req.params.workstationID
    const workstation = await Workstation.findOne({ workstationID: workstationID});
    return workstation
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new state
exports.addWorkstation = async (req, reply) => {
  try {
    const workstation = new Workstation(req.body)
    return workstation.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing state
exports.updateWorkstation = async (req, reply) => {
  try {
    const workstationID = req.params.workstationID
    const workstation = req.body
    const { ...updateData } = workstation
    const update = await Workstation.findOneAndUpdate({workstationID: workstationID}, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a state
exports.deleteWorkstation = async (req, reply) => {
  try {
    const workstationID = req.params.workstationID
    const workstation = await Workstation.findOneAndRemove({ workstationID: workstationID});
    return workstation
  } catch (err) {
    throw boom.boomify(err)
  }
}
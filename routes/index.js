// Import our Controllers
const stateController = require('../controllers/stateController')
const workstationController = require('../controllers/workstationController')

const routes = [
  //states
  {
    method: 'GET',
    url: '/api/states',
    handler: stateController.getStates
  }, 
  {
    method: 'GET',
    url: '/api/states/:stateID',
    handler: stateController.getSingleState
  },
  {
    method: 'POST',
    url: '/api/states',
    handler: stateController.addState
  },
  {
    method: 'PUT',
    url: '/api/states/:stateID',
    handler: stateController.updateState
  },
  {
    method: 'DELETE',
    url: '/api/states/:stateID',
    handler: stateController.deleteState
  },
  //workstations
  {
    method: 'GET',
    url: '/api/workstations',
    handler: workstationController.getWorkstation
  }, 
  {
    method: 'GET',
    url: '/api/workstations/:workstationID',
    handler: workstationController.getSingleWorkstation
  },
  {
    method: 'POST',
    url: '/api/workstations',
    handler: workstationController.addWorkstation
  },
  {
    method: 'PUT',
    url: '/api/workstations/:workstationID',
    handler: workstationController.updateWorkstation
  },
  {
    method: 'DELETE',
    url: '/api/workstations/:workstationID',
    handler: workstationController.deleteWorkstation
  }
]

module.exports = routes
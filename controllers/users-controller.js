const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const validate = require('../validate').validateUserInputs
let payload = {}
const { save , cache , usersList} = require('../persistenceHandler/mockDB');
const debug = require('debug')('chat-node:server');

module.exports.create = async (req,res) => {
if(!validate(req.body)) {
  throw new Error('email and name are required')
}
  const uniqueId = uuidv4()
  payload.id = uniqueId,
  payload.name = req.body.name,
  payload.email = req.body.email,
  payload.room = 'room-1'
  // persist user in memory
  save(payload)
 return payload; 
}

module.exports.getUserById = async (req, res) => {
  if(!req.params.id){
    throw new Error('id parameter is required')
  }
  try {
    const { id } = req.params;
    return usersList.filter(val => val.id === id)
  } catch (err) {
    throw new Error(err);
  }
}


module.exports.postUser = async () => {
  const baseUrl = 'http://localhost:3000'
  const uniqueId = uuidv4()
  let user = {};
  user.id = uniqueId,
  user.name = 'Richard'
  user.email = 'richardfordjr@gmail.com'
  user.room = 'room-1'
  try { 
    debug(`user ${user.id} created`)
    return await axios.post(`${baseUrl}/user`, user)
  } catch(err){
    throw new Error(err);
  }
}

module.exports.getUsers = async (room) => {
  if(!room) {
    throw new Error('room parameter is required')
  }
  try {
   return usersList.filter(val => val.room === room)
  } catch (err) {
    throw new Error(err);
  }
}
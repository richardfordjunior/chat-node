const { v4: uuidv4 } = require('uuid');
const validate = require('../validate').validateUserInputs
let payload = {}
const { save , cache } = require('../persistenceHandler/mockDB');

module.exports.create = async (req,res) => {
if(!validate(req.body)) {
  throw new Error('email and name are required')
}
  const uniqueId = uuidv4()
  payload.id = uniqueId,
  payload.name = req.body.name,
  payload.email = req.body.email
  // persist user in memory
  save(uniqueId, payload);
 return payload; 
}

module.exports.getUserById = async (req, res) => {
  if(!req.params.id){
    throw new Error('id parameter is required')
  }
  try {
    const { id } = req.params;
    if (cache.has(id)) {
      return cache?.data[id]?.v;
    }
  } catch (err) {
    throw new Error(err);
  }
}
const userController = require('../controllers/users-controller');

async function create(req,res){
  try {
    const user = await userController.create(req);
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listById (req, res){
  if(!req.params.id){
    throw new Error('id parameter is required')
  }
  try {
    user = await userController.getUserById(req);
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { create, listById }

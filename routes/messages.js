const chatController = require('../controllers/chat-controller');

async function post(req,res){
  try {
    const user = await chatController.postMessage(req);
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function list (req, res){
  try {
    user = await chatController.getMessages(req);
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { postMessage: post, listMessages: list }
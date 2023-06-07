
const { postUser, getUsers } = require('./users-controller');
const { v4: uuidv4 } = require('uuid');
let socketInfo;
let messages = [];
module.exports = async (io, socket) => {
 socketInfo = socket;
 let roomno = 1
 socket.join(`room-${roomno}`);
 // send user to server
 let user = {};
 let userData = await postUser();
 user.data = { data : { userData }}
 // notify when someone joins
 socket.in(`room-${roomno}`).emit('notification', { title: 'Someone\'s here', description: `${user.data.data} just entered the room` })
 // broadcast message to all users in room
 let users = await getUsers(`room-${roomno}`)
 io.in(`room-${roomno}`).emit('users', users)
}

module.exports.postMessage = async (req) => {
 // mock for persisting to db
 let sendMessage = {}
 sendMessage.id = uuidv4(),
 sendMessage.timestamp = new Date().toISOString()
 sendMessage.text = req.body.text
 sendMessage.room = req.body.room
 sendMessage.email = req.body.email
 messages.push(sendMessage)
 return { message: 'posted'}
}

module.exports.getMessages = async (req) => {
 if(!req.params.room){
    throw new Error('invalid request room is required')
 }
 return messages.filter(msg => msg.room === req.body.room) || []
}

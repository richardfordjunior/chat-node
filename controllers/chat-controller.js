
const { postUser, getUsers } = require('./users-controller');
let socketInfo;
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

module.exports.postMessage = async () => {
 
}

module.exports.getMessages = async () => {


}

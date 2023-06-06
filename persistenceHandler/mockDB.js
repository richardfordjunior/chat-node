const NodeCache = require("node-cache");
const cache = new NodeCache();
let usersList = [];

module.exports.save = (data) => {
  // persist user in memory
  //cache.set(id, data);
  usersList.push(data)
  return usersList;
}
module.exports.cache = cache;
module.exports.usersList = usersList;
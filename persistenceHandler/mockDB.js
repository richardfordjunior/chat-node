const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3000 });

module.exports.save = (id, data) => {

if(!id) return;
  // persist user in memory
  cache.set(id, data);
}
module.exports.cache = cache;
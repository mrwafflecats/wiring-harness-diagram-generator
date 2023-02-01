const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost/mevnStack';//this may cause probs later
const db = monk(connectionString);

module.exports = db;
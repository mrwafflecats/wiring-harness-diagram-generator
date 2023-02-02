const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost/mevnStack';//this may cause probs later
const url ='mongodb+srv://cluster0.n7jqzlc.mongodb.net/myFirstDatabase'
const db = monk(url);

module.exports = db;
var express = require('express');
var router = express.Router();

/* GET home page. */
// TODO: have this post the vue project
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//get is for retrieving data
//POST makes the server take data sent by a client 
//PUT makes the server modify data sent by client, creates a new thing if it doesn't exist
//DELETE is pretty self explanatory



module.exports = router;

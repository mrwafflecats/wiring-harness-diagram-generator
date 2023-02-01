var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var cors = require('cors')

const pins = require('./db/pins')

/* GET home page. */
// TODO: have this post the vue project
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//get is for retrieving data
//POST makes the server take data sent by a client 
//PUT makes the server modify data sent by client, creates a new thing if it doesn't exist
//DELETE is pretty self explanatory

//Gets the pins from the database and posts it somewhere...
app.get('/pins', (req, res) => {
  pins.getAll().then((pins) => {
    res.json(pins)
  })
})

app.post('/pins', (req, res) =>{
  pins.create(req.body).then((pin) => {
    res.json(pin)
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var cors = require('cors')

const pins = require('./db/Pins');
const app = require('../app');

/* GET home page. */
// TODO: have this post the vue project
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//get is for retrieving data
//POST makes the server take data sent by a client 
//PUT makes the server modify data sent by client, creates a new thing if it doesn't exist
//DELETE is pretty self explanatory

//Gets the pins from the database and sends it to client
app.get('/pins', (req, res) => {
  pins.getAll().then((pins) => {
    res.json(pins)
  })
})

app.put('/pins', (req, res) => {
  pins.updatePin(req.body)
    .then((pin) => {
      res.json(pin)
    }).catch((error) => {
      res.status(500)
      res.json(error)
    })
})

//Recieves data from a client and adds it to the database 
app.post('/pins', (req, res) => {
  pins.createPin(req.body)
    .then((pin) => {
      res.json(pin)
    }).catch((error) => {
      res.status(500)
      res.json(error)
    })
})

app.delete('/pins', (req, res) => {
  pins.deletePin(req.body)
    .then((pin) => {
      res.json(pin)
    }).catch((error) => {
      res.status(500)
      res.json(error)
    })
})

module.exports = router;

app.listen(4000)
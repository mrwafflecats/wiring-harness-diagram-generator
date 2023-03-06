var router = require('express').Router();
var bodyParser = require('body-parser')
const pins = require('../db/Pins');


/* GET home page. */
// TODO: have this post the vue project
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//get is for retrieving data
//POST makes the server take data sent by a client 
//PUT makes the server modify data sent by client, creates a new thing if it doesn't exist
//DELETE is pretty self explanatory

router.use(bodyParser.urlencoded({extended: true}))

router.get('/pins', (req, res) => {
  pins.getAll().then((pins) => {
    res.json(pins)
  })
  .catch((error) => {
    res.status(500)
    res.json(error)
  })
})

//Updates a pin sent by client
router.put('/pins', (req, res) => {
  pins.updatePin(req.body)
    .then((result) => {
      res.status(201).json({string:'Successfully updated pin'})
    }).catch((error) => {
      res.status(500)
      res.json(error)
    })
})

//Recieves pin from a client and adds it to the database 
router.post('/pins', (req, res) => {
  pins.createPin(req.body)
    .then((result) => {
      res.status(201).json({string:'Successfully added pin'})
    }).catch((error) => {
      res.status(500).json(error)
    })
})


router.delete('/pins', (req, res) => {
  pins.deletePin(req.body)
    .then((pin) => {
      res.status(200).json({string:'Successfully deleted the pin'})
    }).catch((error) => {
      res.status(500)
      res.json(error)
    })
})

module.exports = router;

//To run the server, $npm run start
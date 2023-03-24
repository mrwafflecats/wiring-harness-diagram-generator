var router = require('express').Router();
const DataManager = require('../db/DataManager');
var bodyParser = require('body-parser')
/* GET home page. */
// TODO: have this post the vue project
  //get is for retrieving data
  //POST makes the server take data sent by a client 
  //PUT makes the server modify data sent by client, creates a new thing if it doesn't exist
  //DELETE is pretty self explanatory
  
  router.use(bodyParser.urlencoded({extended: true}))


  router.get('/:conID', (req, res) => {
    DataManager.PinGet(req.params).then((pins) => {
      res.json(pins)
    })
    .catch((error) => {
      res.status(500)
      res.json(error)
    })
  })
  
  //Updates a pin sent by client
  router.put('/', (req, res) => {
    DataManager.PinUpdate(req.body)
      .then((result) => {
        res.status(201).json({string:'Successfully updated pin'})
      }).catch((error) => {
        res.status(500)
        res.json(error)
      })
  })
  
  //Recieves pin from a client and adds it to the database 
  router.post('/', (req, res) => {
    DataManager.PinCreate(req.body)
      .then((result) => {
        res.status(201).json({string:'Successfully added pin'})
      }).catch((error) => {
        res.status(500).json(error)
      })
  })
  
  
  router.delete('/', (req, res) => {
    DataManager.PinDelete(req.body)
      .then((pin) => {
        res.status(200).json({string:'Successfully deleted the pin'})
      }).catch((error) => {
        res.status(500)
        res.json(error)
      })
  })
  
  
  
  module.exports = router;
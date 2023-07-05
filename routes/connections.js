var router = require('express').Router();
const DataManager = require('../db/DataManager');
var bodyParser = require('body-parser')
/* GET home page. */
  //get is for retrieving data
  //POST makes the server take data sent by a client 
  //PUT makes the server modify data sent by client, creates a new thing if it doesn't exist
  //DELETE is pretty self explanatory
  
  router.use(bodyParser.urlencoded({extended: true}))

  router.get('/', (req, res) => {
    DataManager.ConnectionGet().then((pins) => {
      res.json(pins)
    })
    .catch((error) => {
      res.status(500)
      res.json(error)
    })
  })
  
  //Updates a connection sent by client
  router.put('/:connID', (req, res) => {
    DataManager.ConnectionUpdate(req.body, req.params)
      .then((result) => {
        res.status(201).json({string:'Successfully updated Connection'})
      }).catch((error) => {
        res.status(500)
        res.json(error)
      })
  })
  
  //Recieves connection from a client and adds it to the database 
  router.post('/', (req, res) => {
    DataManager.ConnectionCreate(req.body)
      .then((result) => {
        res.status(201).json({string:'Successfully added Connection'})
      }).catch((error) => {
        res.status(500).json(error)
      })
  })
  
  
  router.delete('/', (req, res) => {
    DataManager.ConnectionDelete(req.body)
      .then((result) => {
        res.status(200).json({string:'Successfully deleted Connection'})
      }).catch((error) => {
        res.status(500)
        res.json(error)
      })
  })
  
  module.exports = router;
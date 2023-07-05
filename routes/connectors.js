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


  router.get('/', (req, res) => {
    DataManager.ConGetAll().then((cons) => {
      res.json(cons)
    })
    .catch((error) => {
      res.status(500)
      res.json(error)
    })
  })

  router.get('/:conID', (req, res) => {
    DataManager.ConGet(req.params).then((pins) => {
      res.json(pins)
    })
    .catch((error) => {
      res.status(500)
      res.json(error)
    })
  })
  
  //Updates a pin sent by client
  router.put('/', (req, res) => {
    DataManager.ConUpdate(req.body)
      .then((result) => {
        res.status(201).json({string:'Successfully updated connector'})
      }).catch((error) => {
        res.status(500)
        res.json(error)
      })
  })
  
  //Recieves pin from a client and adds it to the database 
  router.post('/:devID', (req, res) => {
    DataManager.ConCreate(req.body, req.params)
      .then((result) => {
        res.status(201).json({string:'Successfully added connector'})
      }).catch((error) => {
        res.status(500).json(error)
      })
  })
  
  
  router.delete('/', (req, res) => {
    DataManager.ConDelete(req.body)
      .then((pin) => {
        res.status(200).json({string:'Successfully deleted connector'})
      }).catch((error) => {
        res.status(500)
        res.json(error)
      })
  })
  
  module.exports = router;
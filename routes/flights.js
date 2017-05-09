'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var AirlinePartner = require('../middleware/airlinepartner.js');


router.get('/', function(req, res) {
     res.send('This is flights endpoint');
})

//Search Partners and get Flight Data
router.get('/search', function(req, res) {

     console.log('Request for Flight Search');

     //Search All Airline Partners and return json data
     var airlinePartner = new AirlinePartner();
     airlinePartner.searchAll().then( data => {
          return res.status(200).json(data);
     }).catch(err => {
       return res.status(400).json({
           status: {
               code: 400,
               errorType: err.message
           }
       });
     });

})

module.exports = router

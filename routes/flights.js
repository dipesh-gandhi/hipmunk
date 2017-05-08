'use strict';

var express = require('express')
  , router = express.Router();
var Promise = require('promise');
var AirlinePartner = require('../middleware/airlinepartner.js');
var partners = ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'United'];

router.get('/', function(req, res) {
     res.send('This is flights endpoint');

})

//Search Partners and get Flight Data
router.get('/search', function(req, res) {

     console.log('Request for Flight Search');

     //Get Partner object
     var partner = new AirlinePartner();

     //Create search tasks for each partner
     var tasks = [];
     for(var i in partners){
          tasks.push(partner.search(partners[i]));
     }

     //Do actual search for provides async
     Promise.all(tasks).then( values => {
        return res.send(JSON.stringify(values));
     });


})

module.exports = router

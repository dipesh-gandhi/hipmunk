'use strict';

const Client = require('node-rest-client').Client;
const client = new Client();
var Promise = require('promise');
const SEARCH_URL = process.env.SEARCH_URL || 'http://localhost:9000/scrapers/';

module.exports = class AirlinePartner {

   constructor() {

   }

   search(provider) {
     console.log('--> search invoked ', provider);
     return new Promise(function (fulfill, reject){
         client.get(SEARCH_URL + provider , function (data, response) {
              console.log('success');
              fulfill(data);
          }).on('error', function (err) {
              console.log('error');
              reject(err);
          });
     });
   }
}

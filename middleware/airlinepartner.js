'use strict';

const Client = require('node-rest-client').Client;
const client = new Client();
var Promise = require('promise');
const SEARCH_URL = process.env.SEARCH_URL || 'http://localhost:9000/scrapers/';

//This could be comma delimted env variable, or pulled from config
var partners = ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'United'];

module.exports = class AirlinePartner {

   constructor() {
     //for later use
   }

   //Search single airline provider, given name
   search(provider) {
     console.log('--> search invoked for', provider);
     return new Promise(function (fulfill, reject){
         client.get(SEARCH_URL + provider , function (data, response) {
              console.log('--> search success for', provider);
              fulfill(data.results);
          }).on('error', function (err) {
              console.log('--> search error for', provider);
              reject(err);
          });
     });
   }

   //Search all configured providers, return is sorted by agony
   searchAll(){

     var self = this;

     console.log('--> search all invoked');
     return new Promise(function (fulfill, reject){

           //Create search task for each partner, later executed by Promise.all
           var tasks = [];
           for(var i in partners){
                tasks.push(self.search(partners[i]));
           }

           //Do actual search for all defined profiders async, then sort results by agony
           Promise.all(tasks).then( values => {

              //Format to structure we can sort
              var result = [];
              for(var key in values){
                if (values.hasOwnProperty(key)){
                  for(var entry in values[key]){
                    if (values[key].hasOwnProperty(entry)){
                        result.push(values[key][entry]);
                    }
                  }
                }
              }

              //Sort result set
              result.sort((a,b) => {
                if(a.agony > b.agony ){
                  return 1;
                }else if (a.agony < b.agony ){
                  return -1;
                }else{
                  return 0;
                }
              });

              //support 'results' json structure
              var response = new Object();
              response.results = result;

              fulfill(response);

           }).catch( err => {
              reject(err);
           });
      });
   }
}

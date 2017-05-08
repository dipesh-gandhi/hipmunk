'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();


//load routes
require('./routes')(app);

if (module === require.main) {
  // Start up server
  let server = app.listen(process.env.PORT || 8000, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
}


module.exports = app;

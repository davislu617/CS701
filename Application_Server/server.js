var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
      
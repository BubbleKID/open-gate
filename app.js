var express = require('express');
var five = require("johnny-five");
var board = new five.Board();
var app = express();

const DATA = 12;

board.on("ready", function() {
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.get('/open', function (req, res) {
    res.send('open!');
    board.pinMode(DATA, five.Pin.OUTPUT);
    setTimeout(function(){ 
      board.pinMode(DATA, five.Pin.INPUT)
    }, 3000);
  });

  app.listen(3000, function () {
    console.log("Server's up at http://localhost:3000!")
  });
});
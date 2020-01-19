var express = require('express');
//var five = require("johnny-five");
//var board = new five.Board();
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

const DATA = 12;
  
app.use(cors());
  
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//board.on("ready", function() {
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

  app.post('/login',function(req,res){
     var user={
         email:'admin',
  　　　  password:'admin'
  　　}
  　　if (req.body.email == user.email && req.body.password == user.password) {
        res.setHeader('Content-Type', 'text/plain');
        res.write('success');
        res.end()
  　　} else {
        res.setHeader('Content-Type', 'text/plain');
        res.write('you posted:\n');
        res.end(JSON.stringify(req.body, null, 2));
  　　}
  });

  app.listen(3000, function () {
    console.log("Server's up at http://localhost:3000!")
  });
//});
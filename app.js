var express = require('express');
//var five = require("johnny-five");
//var board = new five.Board();
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.105',
  user     : 'dubbo',
  password : 'ZW4GMH6ahQqdDGnn',
  database : 'open_gate'
});
const DATA = 12;

app.use(cors());
  
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

board.on("ready", function() {
  // app.get('/', function (req, res) {
  //   res.send('Hello World!');
  // });

  // app.get('/open', function (req, res) {
  //   res.send('open!');
  //   board.pinMode(DATA, five.Pin.OUTPUT);
  //   setTimeout(function(){ 
  //     board.pinMode(DATA, five.Pin.INPUT)
  //   }, 3000);
  // });
  connection.connect();
  app.post('/login',function(req,res){
    connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0) {
        if (req.body.password == results[0].password) {
          board.pinMode(DATA, five.Pin.OUTPUT);
          setTimeout(function(){ 
            board.pinMode(DATA, five.Pin.INPUT)
          }, 3000);
          res.setHeader('Content-Type', 'text/plain');
          res.write('success');
          res.end();
          console.log(req.body.email + 'is logged in.')
        }
        else {
          res.setHeader('Content-Type', 'text/plain');
          res.write('Incorrect email or password.\n');
          res.end();
        }
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Incorrect email or password.\n');
        res.end(JSON.stringify(req.body, null, 2));
      }
    }); 
  });

  app.listen(3000, function () {
    console.log("Server's up at http://localhost:3000!")
  });
});
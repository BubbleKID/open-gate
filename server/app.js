var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var five = require("johnny-five");
var board = new five.Board({port: "COM5"});
var mysql      = require('mysql');
var CryptoJS = require("crypto-js");
var dayjs = require('dayjs');

var connection = mysql.createConnection({
  host     : '192.168.1.112',
  user     : 'admin',
  password : 'admin@AEMG000',
  database : 'open-gate'
});
var SIG = 7;
var corsOptions = {
  origin: ['http://192.168.1.108:8080'],
  credentials: true,
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

board.on("ready", () => {
  console.log('board is ready');
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.post('/login',function(req,res){
    connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0) {
        if (CryptoJS.SHA1(req.body.password) == results[0].password) { 
          console.log(req.body.email + ' is logged in.');
          res.setHeader('Content-Type', 'text/plain');
          res.write('success');
          res.end();
          console.log(req.body.email + ' is logged in.');

          var pin = new five.Pin(7);
          board.pinMode(SIG, five.Pin.OUTPUT);
          pin.high();

          connection.query("INSERT INTO logs (user_id, date, user_name) VALUES (?, ?, ?)",
           [results[0].id, dayjs().format('YYYY-MM-DD HH:mm:ss'), results[0].user_name],
           function (error, results, fields) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('success');    
            }
          });

          setTimeout(function(){ 
            board.pinMode(SIG, five.Pin.INPUT)
            pin.low(); 
          }, 3000);	
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

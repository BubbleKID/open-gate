var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var rpio = require('rpio');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.112',
  user     : 'admin',
  password : 'admin@AEMG000',
  database : 'open-gate'
});

// var RaspiCam = require("raspicam");
// var camera = new RaspiCam({ mode: 'photo', output: '/home/pi/Desktop/images/%d.jpg'});
//camera.start('photo');
app.use(cors());

var SIG = 8;
rpio.open(SIG, rpio.OUTPUT);
rpio.write(SIG, rpio.LOW);
 

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.post('/login',function(req,res){
    connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0) {
       if (req.body.password == results[0].password) { 
          console.log(req.body.email + ' is logged in.');
          rpio.write(SIG, rpio.HIGH);
          res.setHeader('Content-Type', 'text/plain');
          res.write('success');
          res.end();
          console.log(req.body.email + 'is logged in.');
	  setTimeout(function(){ rpio.write(SIG, rpio.LOW); }, 3000);	
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

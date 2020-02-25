var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var rpio = require('rpio');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.105',
  user     : 'dubbo',
  password : 'ZW4GMH6ahQqdDGnn',
  database : 'open_gate'
});
// var RaspiCam = require("raspicam");
// var camera = new RaspiCam({ mode: 'photo', output: '/home/pi/Desktop/images/%d.jpg'});
//const DATA = 12;
//camera.start('photo');
app.use(cors());
var recordedSignal = [
  0, 1, 0,  //1    0,1,2   1
  0, 1, 0,  //4    3,4,5   2
  0, 1, 0,  //7    6,7,8   3
  0, 1, 0,  //10   9,10,11 4
  0, 0, 1,  //14   12,13,14 5
  0, 0, 1,  //17   15,16,17 6
  0, 1, 1,  //20   18,19,20 7
  0, 0, 1,  //23   21,22,23 8
  0, 0, 1,  //26   24,25,26 9
  0, 0, 1,  //29   27,28,29 10
  0, 1, 1,  //32   30,31,32 11
  0, 1, 1,  //35   33,34,35 12
  0, 1, 1   //38   36,37,38 13
];
var VCC = 12;
var DATA = 10; 
var GND = 8;
rpio.open(GND, rpio.OUTPUT, rpio.LOW);
rpio.open(VCC, rpio.OUTPUT, rpio.HIGH);
rpio.open(DATA, rpio.OUTPUT);
rpio.write(GND, rpio.LOW);
rpio.write(VCC, rpio.HIGH);
 
function loop(){
  for (var i = 0; i < recordedSignal.length - 1; i++) {
    var k = 187;
    rpio.write(DATA, recordedSignal[i]); 
    if (i == 0) { //1st bottom
      rpio.usleep(40);
    }   
    if (i == 1) { // 1st peak
      rpio.usleep(k-170);
    }
    if (i == 2) { 
      //rpio.usleep(k-187);
    }  
    if (i == 3) { // 2nd bottom
      rpio.usleep(k-30);
    } 
    if (i == 4) { // 2nd peak
      rpio.usleep(k-170);
    }
    if (i == 5) { // 3rd bottom
      rpio.usleep(k-30);
    }
    if (i == 9) { // 4th bottom
      rpio.usleep(k-30);
    }
    if (i == 7) { // 3rd peak
      rpio.usleep(k-170);
    }
    if (i == 10) { // 4th peak
      rpio.usleep(k-170);
    }
    if (i == 11) {

    } 
    if (i == 12) { // 5th bottom
	    rpio.usleep(k);
    } 
    if (i == 14) { // 5th peak
      rpio.usleep(k-170);
    }
    if (i == 16) { // 6th bottom
      rpio.usleep(k);
    }
    if (i == 17) { // 6th peak
      rpio.usleep(k-170);
    }
    if (i == 18) {
      rpio.usleep(k+180);
    }
    if (i == 19) { // 7th peak
      rpio.usleep(k-50);
    }
    if (i == 20) {

    } 
    if (i == 21) {

    } 
    if (i == 22) {

    } 
    if (i == 23) { // 8th peak
      rpio.usleep(k-170);
    }
    if (i == 25) { // 9th bottom
      rpio.usleep(k+180);
    }
    if (i == 26) { // 9th peak
      rpio.usleep(k-170);
    }
    if (i == 28) { // 
      rpio.usleep(k+180); 
    }
    if (i == 29) { //10th peak
      rpio.usleep(k-170);
    }
    if (i == 30) { // 11th bottom
      rpio.usleep(k+200);
    }
    if (i == 31) {
      //rpio.usleep(k);
    } 
    if (i == 32) { // 11th peak
      rpio.usleep(k-40);
    }
    if (i == 33) { // 12th bottom
      rpio.usleep(k+100);
    }
    if (i == 35) { //12peak
      rpio.usleep(k-40);
    }
    if (i == 36) { // 13th bottom
      rpio.usleep(k+10);
    }
    if (i == 38) { // 13th peak
      rpio.usleep(k); 
    }
    rpio.usleep(k);
  }
  rpio.usleep(10000);
} 

function open() {
  for(var i = 0; i < 30; i++) {
    console.log('123')
    loop();
  } 
}

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//board.on("ready", function() {
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  //app.get('/open', function (req, res) {
    //res.send('open!');
    //open();
  //});
  connection.connect();
  app.post('/login',function(req,res){
    connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0) {
       if (req.body.password == results[0].password) {
          //setTimeout(function(){ 
            console.log(req.body.email + 'is logged in.')
            open();
            //board.pinMode(DATA, five.Pin.INPUT)
          //}, 3000);
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
//});
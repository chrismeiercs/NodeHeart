var http = require('http');
var express = require('express');
var serialport = require('serialport');

app = express();
//start a new server
var server = http.createServer(app).listen(3000);

var io = require('socket.io').listen(server);

//connect to the serial port with the heart monitor
var portName = 'COM3';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

sp.on('data', function(input) {
	//send over socket
	console.log(input);
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/graph.html');
});


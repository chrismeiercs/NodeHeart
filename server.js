var serialport = require('serialport');
var express = require('express');
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/graph.html');
});
io.on('connection', function(socket){
	console.log("connected");
	
	sp.on('data', function(input) {
	//send over socket
	//console.log(input);
	io.emit('heart rate', input);
});
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});


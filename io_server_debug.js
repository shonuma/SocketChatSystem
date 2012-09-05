//
// io_server_debug.js
//
var port = 8080;
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/copy_index_.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('my other event', function (data) {
  	console.log("my other event");
    console.log(data);
  });
  
  socket.on("login",function(msg){
  	console.log(msg+"が接続しました");
  });
  
	socket.on("disconnect",function(msg){
  	console.log(msg);
  	console.log("誰かが終了しました");	
	});
  
  socket.on("message",function(msg){
		var message = msg;
  	if(message.match(/message:/)){
  		var getmes = message.substring(8);
  		message = getmes;
  	}
  	console.log(message);
		socket.send(message);
		socket.broadcast.send(message);
	});
});
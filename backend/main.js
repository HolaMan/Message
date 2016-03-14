var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('connected');
  socket.on('chat message', function(msg){
		console.log(msg);
		io.emit('chat message', msg);
  });
});

http.listen(8123, function(){
  console.log('listening on *:8123');
});
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);
app.use(express.static('public'));

io.on('connection',function(socket){
	console.log("A user : "+socket.id+" is connected");

	 socket.on('chatVideo',function(data){
	 	io.sockets.emit('broadcast',data);
	 });

	socket.on('disconnect',function(){
		
		console.log('User : '+socket.id+" is disconnect");
	});
});


http.listen('3000',function(){
	console.log('listening on : 3000');
});
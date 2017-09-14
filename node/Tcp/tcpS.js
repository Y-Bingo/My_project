var net = require('net');

var server = net.createServer(function(socket){
	socket.on('connection',function(){
		console.log('new client\n');
	})
	socket.on('error',function(err){
		console.log('client : ' + err + " \n");
	})
	socket.on('close',function(){
		console.log('one client disconnect\n');
	})
})

server.listen(8885,"127.0.0.1")
console.log('server listening\n');
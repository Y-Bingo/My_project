var tcp = require('net');

var client = tcp.createConnection({port : 8885},function(){
	console.log('connect to server')
});

client.on('data',function(data){
	console.log(data.toString());
})

client.on('end',function(){
	console.log('disconnected from server');
})



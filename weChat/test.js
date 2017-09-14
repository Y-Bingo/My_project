var promise = require('bluebird');

new promise((res,rej)=>{
	res(1);
}).then(function(data){
	console.log(data);
	return promise.resolve(4);
}).then(function(data){
	console.log(data);
})
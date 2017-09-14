var mongoose = require('mongoose');
var config = require('./config.js');

var host = config.mongodb.host;
var database = config.mongodb.database;
module.exports = function(){
	// var db = mongoose.createConnection(host, database);
	// db.on('error', console.error.bind(console,'mongoDB connect faile'));
	// db.on('open',function(){
	// 	console.log('MongoDb connect success !\n');
		
	// 	// 导入模型，注册模型
	// 	require('../app/models/news.server.model');
		
	// 	// 成功连接就返回db
	// 	return db;
	// })
	var db = mongoose.connect(config.mongodb.uri,{useMongoClient:true});

	require('../app/models/news.server.model');

	return db;
}
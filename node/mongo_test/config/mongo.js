var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
	// 连接数据库
	var db = mongoose.connect(config.mongo_uri,{ useMongoClient: true });
	require('../model/user.server.model.js');
	// 返回一个连接对象
	return db;
}
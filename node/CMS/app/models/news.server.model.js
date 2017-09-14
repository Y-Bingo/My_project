var mongoose = require('mongoose');

// 定义模型
var NewsSchema = new mongoose.Schema({
	title : String,
	content: String,
	create_time : {
		type:Date,
		default: Date.now
	}
})

// 注册模型
var News = mongoose.model('News',NewsSchema);
var mongoose = require('mongoose');

// 定义模型
var cms_user  = new mongoose.Schema({
	user_id : Number,
	user_name: String,
	user_pwd : String,
	create_time : Date,
	last_time : Date
})
// 注册model
mongoose.model('cms_user',cms_user);
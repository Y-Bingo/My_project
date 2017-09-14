// 这个文件是用来做一些初始化配置的
// 导出express实例对象
// 配置一些路径基本处理
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');


// 导出app实例
module.exports = function(){
		// 实例化express
		var app = express();
		
		app.use(morgan());
		
		// 解析json数据
		app.use(bodyParser.json());
		
		var router = require('../app/routers/base');
		router(app);

		// 做一些如果获取不了资源的报错处理
		//找不到该资源
		app.use(function(req,res,next){
			res.status(404);
			return res.json("404 not found");
		})
		// 服务器错误
		app.use(function(err,req,res,next){
			if(err){
				res.status(500);
				return res.json(err.message || 'server error')
			}else{
				return next();
			}
		})

		return app;
}
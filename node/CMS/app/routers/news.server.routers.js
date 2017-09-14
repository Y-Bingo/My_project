var newsControler = require('../controlers/news.server.controler');
var express = require('express');

var Router = express.Router();

// 请求获取列表
Router.get('/',newsControler.list)

// 创建
Router.post('/',newsControler.create)

//详情页
Router.post('/:id',newsControler.getDetail)
//参数验证
Router.post('id',newsControler.getId);



module.exports = Router;
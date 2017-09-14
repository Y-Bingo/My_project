'use strict'

var Koa    = require('koa');
var wechat = require('./wechat/g');//处理微信的底层逻辑
var config = require('./config');
var weixin = require('./weixin');//处理微信的表层逻辑

var app = new Koa();

// 使用配置微信的的中间件,weixin.reply相当于handler
app.use(wechat(config.wechat,weixin.reply));

app.listen(80)
console.log("Listening:80")
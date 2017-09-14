'use strict'
var sha1 = require('sha1')
var Wechat = require('./wechat.js');
var getRawBody = require('raw-body');

// 引入工具列模块
var util = require('./util');

// 微信处理中间件
module.exports = function(opts, handler){
		// 连接微信服务器，获取access_token
		var wechat = new Wechat(opts);


		return function* (next){
				// console.log(this.query)
				var that = this;
				var token = opts.token;
				// 验证获取的数据
				var signature = this.query.signature;
				var nonce     = this.query.nonce;
				var timestamp = this.query.timestamp;
				var echostr   = this.query.echostr;
				// 拼接字符串
				var str = [token,timestamp, nonce].sort().join("");
				// // 加密
				var sha = sha1(str);

				if(this.method === 'GET'){
					if(sha === signature ){
							this.body = echostr + '';
					}else{
							this.body = 'wrong';
					}
				}else if(this.method = "POST"){//用户操作的请求
					if(sha !== signature ){//验证请求签名
						return false;
					}
					// 获取请求回来的数据
					var data = yield getRawBody(this.req,{
						length :  this.length,
						limit  : '1mb',
						ecoding : this.charset
					});
					// Xml转化为js对象
					var content = yield util.parseXMLAsync(data);
					// 格式化，扁平化
					var message = util.formatMessage(content.xml);
					// 把内容注册到全局对象中
					this.weixin = message ;
					// 转移控制权到外层
					yield handler.call(that, next);
					// 响应微信服务器
					wechat.reply.call(that);
				}

		}
}
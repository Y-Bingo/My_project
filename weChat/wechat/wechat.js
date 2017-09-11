'use strict'

/**
 * [获取token专用类]
 */
var Promise = require('bluebird')
// var request =  Promise.promisify(require('request'));//promise 化
var request = require('request');

var util    = require('./util');


// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
var api_prefix = "https://api.weixin.qq.com/cgi-bin/";
var api = {
	access_token: api_prefix +"token?grant_type=client_credential"
}
/**
 * [access_token 公众号的全局唯一接口调用凭据 ]
 * @param {obj} [存储票据信息]
 */
function Wechat(opts){
	var that = this;
	this.appID = opts.appID;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts.getAccessToken;//获取
	this.saveAccessToken = opts.saveAccessToken;
	// 调用获取access_token的方法
	this.getAccessToken()
		  .then(function(data){
				try{
					data = JSON.parse(data);
				}catch(e){
					// 当发现票据信息不存在或者读取错误的时候，则应该更新票据信息
					return that.updateAccessToken(data)	
				}
				// 票据合法性的检查，检查票据是否合法，是否过期
				if( that.isValidAccessToken(data) ){
					// 如果合法直接把data数据传下去，不要用Promise.resovle
					return data;
				}else{
					return that.updateAccessToken(data);
				}
			})
			.then(function(data){
				that.access_token = data.access_tokent;
				that.expires_in = data.expires_in;
				// 保存token
				that.saveAccessToken(data);
			})
}
// 验证票据信息
Wechat.prototype.isValidAccessToken = function(data){
	// 票据不存在、access_token 不存在、exprie_in 不存在
	if( !data || !data.access_token || !data.expires_in){
		return false;
	}
	var access_token = data.access_token;
	var expires_in = data.expires_in;
	var now = (new Date().getTime())
	// 判断是否过期
	if(now < expires_in ){
		return true
	}else{
		return false
	}
	//判断新旧是否相同
}

Wechat.prototype.updateAccessToken = function(){
	var appID      = this.appID;
	var appSecret = this.appSecret;
	var url = api.access_token + '&appid=' + appID + '&secret=' +appSecret;

	return new Promise(function(resolve, reject){

		request.get(url,function(err,res,body){
			if(err) reject();
			var data  = JSON.parse(body) ;
			var now = (new Date().getTime())
			// expires_in = 7200 减去20s ，网络延迟和服务器响应，化为毫秒数
			var expires_in = now +(data.expires_in - 20 ) * 1000;
			// 更新有效时间
			data.expires_in = expires_in;
			resolve(data);
		})
		// 发起请求 获取token 
		// request(url).then(function(response){
		// 	var data = response[1];
		// 	// console.log(data);
		// 	console.log(url);
		// 	var now = (new Date().getTime())
		// 	// expires_in = 7200 减去20s ，网络延迟和服务器响应，化为毫秒数
		// 	var expires_in = now +(data.expires_in - 20 ) * 1000;
		// 	// 更新有效时间
		// 	data.expires_in = expires_in;
		// 	resolve(data);
		// }).catch(function(err){
		// 	console.log(err)
		// })
	})
}
// 响应的方法
Wechat.prototype.reply = function(){
	var content = this.body;
	var message = this.weixin;

	var xml     = util.tpl(content,message);

	this.status = 200;
	this.type   = 'application/xml';
	this.body   = xml;

}

module.exports = Wechat;


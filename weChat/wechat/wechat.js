'use strict'

/**
 * [获取token专用类]
 */
var Promise = require('bluebird')
// var request =  Promise.promisify(require('request'));//promise 化
var request =  require('request') ;

var util    = require('./util');

var fs = require('fs');


// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
var api_prefix = "https://api.weixin.qq.com/cgi-bin/";
var api = {
	access_token: api_prefix +"token?grant_type=client_credential",
	upload :api_prefix + "media/upload?"
}
/**
 * [access_token 公众号的全局唯一接口调用凭据 ]
 */
function Wechat(opts){
	var that = this;
	this.appID = opts.appID;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts.getAccessToken;//获取
	this.saveAccessToken = opts.saveAccessToken;
	// 调用获取access_token的方法
	this.fetchAccessToken();
}

Wechat.prototype.fetchAccessToken = function(data){
	var that = this;
	
	if(this.access_token && this.expires_in){
		if(this.isValidAccessToken(this)){
			console.log('this has accesstoken');
			return Promise.resolve(this);
		}
	}

	this.getAccessToken()
			.then(function(data){
				try{
					data = JSON.parse(data);
					console.log('getaccesstoken:',true)				
				}catch(e){
					// 当发现票据信息不存在或者读取错误的时候，则应该更新票据信息
					return that.updateAccessToken(data)	
					console.log('updateaccesstoken:',true)									
				}
				// 票据合法性的检查，检查票据是否合法，是否过期
				if( that.isValidAccessToken(data) ){
					// 如果合法直接把data数据传下去，不要用Promise.resovle
					console.log('isvalidaccesstoken',true)									
					return Promise.resolve(data);
				}else{
					console.log('isvalid',false)														
					return that.updateAccessToken(data);
				} 
			})
			.then(function(data){
				console.log('bind to that');
				// 在这里获取access_token,并保存到全局对象中
				that.access_token = data.access_token;
				that.expires_in = data.expires_in;
				// 保存token
				that.saveAccessToken(data);
				return Promise.resolve(data);
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
	})
}

// 获取mediaID
Wechat.prototype.uploadMedia = function(type , filepath){
	var that = this;
	var form = {
		media : fs.createReadStream(filepath)
	}
	var appID      = this.appID;
	var appSecret  = this.appSecret;
	var url = api.access_token + '&appid=' + appID + '&secret=' +appSecret;

	return new Promise(function(resolve, reject){
		that.fetchAccessToken()
			.then(function(data){
				
				var url = api.upload + "&access_token=" +data.access_token+"&type="+type;	
				console.log(url);
				request.post(url,{formData:form,json:true },function(err,res,body){
					if(err) {
						reject();
						console.log(err);
					}
					// console.log(body);
					var _data  = body;
					if(_data){
						resolve(_data);
					}else{
						throw new Error("upload medaia faile");
					}
				})
			})
	})
}

// 响应的方法
Wechat.prototype.reply = function(){
	// console.log("wechat.js",this);
	var content = this.body;

	var message = this.weixin;
	// 把内容转换为xml格式
	var xml     = util.tpl(content,message);
	this.status = 200;
	this.type   = 'application/xml';
	this.body   = xml;
	console.log(xml);
}
module.exports = Wechat ;

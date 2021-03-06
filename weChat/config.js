'use strict'

// 配置文件

var path   = require('path');
var util   = require('./libs/util');
var wechat_file = path.join(__dirname , './config/wechat.txt');

var config = {
	wechat : {
			appID : 'wx9b20e4ca0e230d44',
			appSecret : '34753ad0492359fdfb61ca22f37df29c',
			token : 'ybingo_wechat',
			getAccessToken : function(){
				return util.readFileAsync(wechat_file)
			},
			saveAccessToken: function(data){
				data = JSON.stringify(data);
				return util.writeFileAsync(wechat_file,data)
			}
	}
}

module.exports = config;
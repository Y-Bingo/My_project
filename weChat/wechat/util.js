'use strict'

var xml2js  = require('xml2js')
var Promise = require('bluebird')
var tpl     = require('./tpl');

// 解析xml 为js对象
exports.parseXMLAsync = function(xml){
	return new Promise(function(resolve,reject){
		xml2js.parseString(xml, {trim : true}, function(err,content){
			if(err) reject(err)
			else resolve(content); 
		})
	})
}

// 数据扁平化
function formatMessage(result){
	var msg = {};
	// 判断参数类型  对象，数组，字符串
	if( typeof result === 'object'){
		var keys = Object.keys(result);

		for(var i=0 ; i<keys.length; i++){
			var key = keys[i];//键
			var item = result[key];//值
			if( !( item instanceof Array) || item.length === 0){//不是数组，或者长度为0(数组为空)
				continue;
			}
			if(item.length === 1){//只有一个元素的数组或者是对像
				var val = item[0];
				if( typeof val === 'object'){//如果值仍为对象类型，则再一步遍历数据
					msg[key] = formatMessage(val)
				}
				else{
					msg[key] = (val || "").trim();
				}
			}else{//为数组
				msg[key] = [];
				for(var j=0 ; j < item.length ;j++){
					msg[key].push( formatMessage(item[j])  );
				}
			}
		}
	}
	return msg 
}


// 因为有个回归调用，所以用以下暴露方法
exports.formatMessage = formatMessage;

exports.tpl  = function(content,message){
	var info = {};//临时存储内容
	var type = "text";
	var fromUserName = message.FromUserName ;
	var toUserName   = message.ToUserName;
	// 如果为数组，则为图文消息
	if(Array.isArray(content)){
		type = 'news'
	}
	// content有值则应覆盖
	type = content.type || type;
	info.content = content;

	info.createTime = new Date().getTime();
	info.toUserName = toUserName ;
	info.fromUserName = fromUserName;
	info.msgType = type ;

	return tpl.compiled(info);
}
'use strict'

exports.reply = function* (next){
	var message = this.weixin;
	
	if(message.MsgType === 'event'){
		if(message.Event === 'subscribe'){
			if(message.EvetKey){
				console.log('扫二维码进来'+message.EventKey + " "+ message.ticket);
			}
			this.body = '哈哈' + '消息ID' + message.MsgId
		}else if(message.Event === 'unsubscribe'){
			console.log("取消关注了");
			this.body = '';
		}
	}else{

	}
}
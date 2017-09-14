'use strict'
var config = require('./config');
var Wechat = require('./wechat/wechat');

var wechatApi = new Wechat(config.wechat);
  
// 微信回复
exports.reply = function* (next){
	var message = this.weixin;
	// 对用微信服务器发送的请求进行判断
	// 对用户的行为进行判断与分类
	if(message.MsgType === 'event'){
		if(message.Event === 'subscribe'){//关注
			if(message.EventKey){//扫码进来的post请求中会含有eventkey
				console.log('扫二维码进来'+message.EventKey + " "+ message.ticket);
			}
			this.body = '哈哈' + '消息ID : ' + message.MsgId
		}else if(message.Event === 'unsubscribe'){//取消关注
			console.log("取消关注了");
			// 取消关注也要回复一个内容，不然会报错
			this.body = '';
		}else if(message.Event === 'SCAN'){//已关注后扫二维码
			this.body = '我看到你扫二维码了！,二维码是：'+ message.Ticket
		}else if(message.Event === "LOCATION"){//上报地理位置
			this.body = '你的位置为：' + message.latitude + '\n';
		}else if(message.Event === "CLICK"){//点击菜单
			this.body = '你点击了一个菜单：'+ message.EventKey;
		}else if(message.Event === "VIEW"){//点击菜单跳转
			this.body = '你将要跳转到这个url上：'+ message.EventKey;
		}
	}else if(message.MsgType === 'text'){//如果为文本类型
		var content = message.Content;
		var reply  = '你说 ：'+ content + "?\n再说一遍？";
		
		switch(content) {
			case "1":reply = "请回复2！";break;
			case "2":reply = "请回复3！";break; 
			case "3":
				var data =yield  wechatApi.uploadMedia('image',__dirname+'/1.jpg'); 
				console.log("upload!");
				reply = rtnImga(data);
				console.log(reply);
				break; 
			case "4":reply = rtnPT();break;
			default:break; 			
		}
		this.body = reply;
	}
}

function rtnPT(){
	return [{
		title : '2017，我们来聊聊 Node.js',
		description: "2017，我们来聊聊 Node.js",
		picUrl : "https://pic4.zhimg.com/e68b6542497a963a0f8bc8d2863c9193_b.png",
		url : "https://cnodejs.org/topic/58eee565a92d341e48cfe7fc"
	},
	{
		title : '饿了么大前端 Node.js 进阶教程',
		description: "《如何通过饿了么 Node.js 面试》的开源的 Node.js 进阶教程",
		picUrl : "https://dn-cnode.qbox.me/FlwW5i2h_UuKpnBXXvD3AqyrwjHP",
		url : "https://cnodejs.org/topic/58ad76db7872ea0864fedfcc"
	},
	{
		title : '一份优秀的前端开发工程师简历是怎么样的？',
		description: "一份优秀的前端开发工程师简历是怎么样的？",
		picUrl : "https://pic4.zhimg.com/e68b6542497a963a0f8bc8d2863c9193_b.png",
		url : "https://www.zhihu.com/question/23150301"
	}]
}

function rtnImga(data){
	
	return {
		type : "image",
		mediaId : data.media_id,
		// created_at : new Date().getTime()
	}
}
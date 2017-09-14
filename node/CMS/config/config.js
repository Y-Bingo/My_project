var config = null ;

// 根据系统环境来选择配置文件
if( process && process.env && process.env.NODE_ENV){
	config = require("./dev/"+process.env.NODE_ENV+".js");
}else{
	// 引用默认配置文件
	config = require('./dev/dev');
}

module.exports = config ;
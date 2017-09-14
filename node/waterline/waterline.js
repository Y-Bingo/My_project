var waterline = require('waterline')
var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');//引入mongo适配器

// 定义适配器
var adapters = {
	mongo : mongoAdapter,
	mysql : mysqlAdapter,
	default:'mongo'
};
// 定义连接
var connections = {
	mongo : {
		 adapter : 'mongo',
		 url : 'mongo://localhost/Test'
	},
	mysql : {
		adapter : 'mysql',
		url : 'myslql://root:@localhost/Test'
	}
}

// 定义模型
var User = waterline.Collection.extend({
	identity : 'user',
	connection : 'mongo',
	schema : true,
	attributes :{
		username : {
			type : 'string',
			require : true
		},
		birthday : {
			type : 'date',
			before:new Date('2017-12-30'),
			after: new Date('1990-1-1')
		}
	}
})
// 实例化waterline
var orm = new waterline();
// 加载user
orm.loadCollection(User);
var config = {
	adapters : adapters,
	connections : connections
}
// 初始化
orm.initialize(config,function(err){
	if(err){
		config.log('connect Error:',err);
		return ;
	}
});





var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
	// // 实例化模型
	var cms_user = mongoose.model('cms_user');
	var user = new cms_user({
		user_id : 1,
		user_name : 'YB',
		user_pwd : '123456',
		create_time : new Date(),
		last_time : new Date()
	});
	user.save(function(err){
		if(err){
			console.log('db Error',"can't save")
			return ;
		}else{
			cms_user.find({},function(err,doc){
				if(err){
					console.log("can't find any data");
					return ;
				}else{
					res.send(doc);
				}
			})
		}
	})
	// res.send('user test');
});

module.exports = router;

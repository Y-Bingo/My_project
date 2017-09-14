var mongoose = require('mongoose');

// 获取模型
var News = mongoose.model("News");

module.exports = {
	create : function(req,res,next){
		var news = new News(req.body)

		news.save(function(err){
			if(err)return ;
			return res.json( news ); 
		})
	},
	list : function(req,res,next){
		var pageSize = parseFloat(req.query.pageSize || 10);
		var pageStart = parseFloat(req.query.pageStart || 1);
		News
			.find()
			.skip((pageStart-1)*pageSize)
			.limit(pageSize)
			.exec(function(err,docs){
				if(err) return next(err);

				if(!docs.length) return res.json('no more');
				
				return res.json(docs)
			})
	},
	getId : function(req,res,next,id){
		if(!id) return ;
		News.findOne({_id:id},function(err,doc){
			if(err) return res.json('news not found')
			res.news = doc ;
			return next();
		})
	},
	getDetail : function(req,res,next){
		return res.json(res.news);
	}

}
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/Test',{useMongoClient:true});
var bookSchema = mongoose.Schema({
	isbn : String,
	bookname : String,
	author : {
		type :String,
		default: 'WU MING'
	}
})

// 均在Schema上定义
bookSchema.statics.isbnFind = function(isbn,cb){
	this.findOne({isbn:isbn},function(err,data){
		
		cb(err,data);
	})
}
bookSchema.methods.print = function(){
	console.log(this);
}

// 静态方法与实例方法需要在注册前定义
var Book = mongoose.model('bookSchema',bookSchema);

var book1 = new Book({
	isbn : '2222',
	bookname : "INI"
});
var book2 = new Book({
	isbn : '8888',
	bookname :" ogog",
	author : 'yb',
})

// 要连接数据库后才能使用save 方法
book1.save(function(err){
	if(err){
		console.log("can't save")
		return;
	}
	Book.isbnFind("2222",function(err,data){
		if(err){
			console.log("can't Found:",err)
			return ;
		}else{
			console.log(data);
		}
	})
})
book2.save(function(err){
	if(err){
		console.log("can't save")
		return;
	}
	book2.print();
})
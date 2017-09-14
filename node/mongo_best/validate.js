var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Test',{useMongoClient:true});

var BookSchema = mongoose.Schema({
	bookname : {
		type : String,
		required: true,
	},
	Author : {
		type : String,
		validate:function(author){
			return author?true:false
		}
	},
	isbn: {
		type : String,
		require:true,
		match: /book/g
	}
})

var Book = mongoose.model('Book',BookSchema);

var book = new Book({

	Author : 'dd',
	isbn : "book5555555"
})
book.save(function(err){
	if(err){
		console.log('save Error:',err)
	}else{
		console.log('save success');
	}
})
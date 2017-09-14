var mongoose = require('mongoose');

UserSchema = mongoose.Schema({
	username : String
}) 

var BookSchema =  mongoose.Schema({
	bookname : String,
	author :{
		type : mongoose.Schema.ObjectId,
		ref : ''
	}
})
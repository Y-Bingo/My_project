var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan());
app.use(express.static('./public'))
/* 1 */
app.get('/',function(req,res){
	res.end('test');
})

/* 2 */
var Router = express.Router();

Router.get("/hello",function(req,res){
	res.end('hello');
})
app.use('/user',Router);


/*  */
app.param("id",function(req,res,next,id){
	res.id = "get  "+id ;
	next();
})

/* 3 */
app.route('/blog/:id')
		.get(function(req,res){
			res.end('blog /get')
		})
		.post(function(req,res){
			res.end('blog /post')
		})



app.listen(3000,function(){
	console.log('listent 3000:');
})

var express =  require('express');
var path = require('path');//规范化路径
var fs = require('fs');//文件模块
var bodyParser = require('body-parser');//表单解析

var port = process.env.PORT || 3000 ; //设置端口，可从命令行获取
var app = express();//启动一个web服务器

app.set('views' ,'./views');//设置默认的视图目录
app.set('view engine', 'jade');//设置模版

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'bower_components')));//设置静态资源获取路径
app.listen(port);//设置监听端口

console.log('listening 3000');

// index page
app.get('/',function(req,res){
	var movies = getData('index');
	res.render('index',{
		"title"  : '首页',
		"movies" : movies 
	})
})

// detail page
app.get('/detial/:id',function(req,res){
	var movie = getData('detail');
	res.render('detail',{
		"title"  : '详情页',
		"movie" : movie 
	})
})

// admin page
app.get('/admin/move/:id',function(req,res){
	var movie = getData('admin');
	res.render('admin',{
		"title"  : "后台管理页",
		"movie" : movie 
	})
})

// list page
app.get('/admin/list',function(req,res){
	var movies = getData('list');
	res.render('list',{
		"title"  : '后台列表',
		"movies" : movies 
	})
})

function getData(name){
	var filePath = path.join(__dirname,'data',name+".json");
	var movies = fs.readFileSync(filePath,'utf8');
	return JSON.parse(movies);
}
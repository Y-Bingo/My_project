module.exports = function(app){
	// /news
	var news = require('./news.server.routers');
	app.use('/news',news);
	
}
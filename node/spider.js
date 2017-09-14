var http = require('http');
var cheerio = require('cheerio');

function getChapters(html){
    var $ = cheerio.load(html);
    var chapters = [];
    var $chapter = $('.chapter');
    $chapter.each(function(index,item){
        var title = $(item).find('strong').text().trim();
        var $videos = $(item).find('.video li');
        var chapter = {
            "title" : title,
            "videos" : []
        };
        $videos.each(function(index,item){
            var title = $(item).find('a').text().trim();
            var id = $(item).data('media-id');
            chapter.videos.push({
                "title" : title,
                "id"   : id
            }) 
        })
        chapters.push(chapter);
    })
    return chapters;
}
function consoleData(data){
    data.forEach(function(item){
        console.log(item.title+"\n");
        item.videos.forEach(function(item){
            var title = item.title;
            var id = item.id;
            console.log('【'+id+'】 '+ title + '\n');
        })
    })
}

http.get('http://www.imooc.com/learn/348',function(res){
    var html = '';
    res.on('data',function(data){
        html += data;
    })
    res.on('end',function(){
        var data = getChapters(html);
        // console.log(data);
        consoleData(data);
        // console.log(html);
    })
})
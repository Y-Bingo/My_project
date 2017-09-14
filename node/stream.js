var fs = require('fs');

// 创建一个可读流
var readStream = fs.createReadStream('./strea.png');
// 创建一个可写流
var writeStream = fs.createWriteStream('./stream_copy.png');
var n = 0;

readStream.on('data',function(chuck){
    n++;
    // 如果还没写完
    if(writeStream.write(chuck)=== false){
        // 暂停流的读取
        readStream.pause();
    }
}).on('end',function(){
    console.log('读完了！');
}).on('error',function(e){
    console.log(e);
    console.log('读出有误');
});

writeStream.on('drain',function(){
    console.log('写完了'+n);
    readStream.resume();
})



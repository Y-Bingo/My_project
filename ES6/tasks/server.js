import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from  'gulp-live-server';
import args from './util/args';

gulp.task('server',(cb)=>{
    if(!args.watch) return cb();
    // 创建服务器
    var server = liveserver.new(['--harmony','server/bin/www']);
    // 启动服务器
    server.start();
    // 文件修改
    gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
        server.notify.apply(server,[file]);
      })
    // 监听路由更改
    gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
        server.start.bind(server)()
      });

})
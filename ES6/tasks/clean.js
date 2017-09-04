import gulp from 'gulp';
import del from 'del';
import args from './util/args';


gulp.task('clean',()=>{
    // 清空文件夹
    return del(['server/pbulic','server/views'])
})
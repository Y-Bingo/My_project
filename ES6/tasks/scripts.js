import gulp from 'gulp';
import gulpif from 'gulp-if'; //gulp语句中做if判断
import concat from 'gulp-concat';//处理文件拼接
import webpack from 'webpack';//打包
import gulpWebpack from 'webpack-stream';//文件流处理
import named from 'vinyl-named';//文件重命名标志
import livereload from 'gulp-livereload';//文件热更新
import plumber from 'gulp-plumber';//处理文件信息流
import rename from 'gulp-rename';//文件重命名
import uglify from 'gulp-uglify';//压缩文件
import {log,colors} from 'gulp-util';//命令行输出，色彩输出
import args from './util/args';//对命令行参数解析的包

// 创建gulp任务
gulp.task('scripts', ()=>{
    return gulp.src(['app/js/index.js'])
    // 处理错误逻辑
    .pipe(plumber({
        errorHandler:function(){

        }
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      module:{
        loaders:[{
          test:/\.js$/,
          loader:'babel-loader'
        }]
      }
    }),null,(err,stats)=>{
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    // 把编译好的文件写人这个文件件中
    .pipe(gulp.dest('server/public/js'))
    .pipe(rename({
      basename:'cp',
      extname:'.min.js'
    }))
    // 压缩文件，并保存
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch,livereload()))
})

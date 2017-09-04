import yargs from 'yargs';

const args = yargs

    .option('production',{
        bollean :true,
        default :false,
        describe:'min all scripts'
    })

    .option('watch',{
        bollean: true ,
        default: false,
        describe: 'watch all files'
    })

    .option('verbose', {
        bollean:true,
        default: false,
        describe:'log'
    })

    .option('sourcemaps',{
        describe:'force the createion of soucemaps'
    })

    .option('port',{
        string : true,//默认是字符串类型
        default:8080,//默认端口
        describe:'server port'
    })

    .argv

    
    export default args;
//修饰器
// 是一个函数
// 修改类的行为
// 扩展类
{
    let  readonly = function(target,name,descript){
        descript.writable = false;
        return descript;
    }

    class Test{
        @readonly
        time(){
            return '2017-03-11';
        }
    }
    let test = new Test();
    // 不能修改，因为修饰器限制他为只读
    // test.time = function(){
    //     return '2017-8-8'
    // }
    console.log( test.time() );
}
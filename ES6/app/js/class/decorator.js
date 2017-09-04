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

{
    let typename = function(target,name,descript){
        target.myname = 'hello';
    }
    @typename
    class Test{

    }
    console.log(Test.myname);

    // 第三方库修饰器的使用，npm install core-decoration
}
{
    let log = (type)=>{
        return function(target,name,descriptor){
            let src_method = descriptor.value;
            descriptor.value = (...arg)=>{
                src_method.apply(target,arg);
                console.log('log',type);
            }
        }
    }

    class AD{
        @log('show')
        show(){
            console.log('ad is show');
        }
        @log('click')
        click(){
            console.log('ad is click');
        }
    }

    let ad = new AD();
    ad.show();
    ad.click();
}
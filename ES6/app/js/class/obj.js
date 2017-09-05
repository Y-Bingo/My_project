{
    // 简介表达
    let o=1;
    let k=2;
    let es5 = {
        o : o,
        k: k
    };
    let es6 = {o,k};
    
    let es5_method = {
        hello : function(){
            console.log('hello');
        }
    }
    let es6_method ={
        hello(){
            console.log('hello');
        }
    }
    es5_method.hello();
    es6_method.hello();
}
{
    // 属性表达式
    let a = 'b';
    let es5_obj ={
        a : 'c'
    };
    let es6_obj = {
        [a] : 'c'
    }
    console.log(es5_obj,es6_obj);
}

{
    // 新增api Object.is  相当于 ===
    console.log('字符串',Object.is('abc','abc'));
    console.log('数组',Object.is([],[]));
}
{
    console.log('拷贝', Object.assign({a:'a'},{b:'b'} ) );
}
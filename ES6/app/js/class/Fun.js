{
    function test(x,y = 'world'){
        console.log('默认值',x,y);
    }    
    test('hello','kill');
}

{
    // 作用域问题
    let x = 'test';
    // function test2(x,y=x){
    //     console.log('作用域',x,y);
    // }
    function test2(c,y=x){
        console.log('作用域',c,y);
    }
    test2('dd');
}
{
    // rest参数
    function test3(...arg){
        for(let v of arg){
            console.log('rest',v);
        }
    }
    test3(1,2,3,4,'a');
}
{
    // 扩展运算符
    console.log(...[1,2,4]);
    console.log('a',...[1,2,4]);    
}
{
    let arrow = v=>v+2;
    console.log(arrow(3));
}
{  
    //  伪调用
    function tail(x){
        console.log('tail',x);
    }
    function fx(x){
        return tail(x)
    }
    fx(123);
}
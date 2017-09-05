{
    let a,b,rest;
    [a,b] = [1,3];
    console.log(a,b);
}
{
    let a ,b,rest ;
    [a,b,...rest]=[1,2,3,4,5,6];
    console.log(a,b,rest);
}

{
    let a, b, rest ;
    ({a,b}={a:1,b:2});
    console.log(a,b);
}
{
    // 变量交换
    let a = 1;
    let b =2;
    [a, b] = [b, a];
    console.log(a,b);
}

{
    // 函数返回赋值
    function f(){
        return [1,2];
    }
    let a, b ;
    [a,b]= f();
}

{
    // 只关心自己所需的函数返回值
    function f(){
        return  [1,2,3,4,5]
    }
    let a,b,c;
    [a,,,b] = f();
    console.log(a,b);
}
{
    // 只关心结构第一个数据，其他用一个变量来接受
    function f(){
        return [1,2,3,4,5];
    }
    let a,b,c;
    [a,,,...b] = f();
    console.log(a,b);
}

{
    // 对象解构
    let o ={ p:34, q:true};
    let {p,q} =o;
    console.log(q,p);
}

{
    let {a,b} = {b:2};
    console.log(a,b);
}
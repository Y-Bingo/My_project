{
    // genrator基本定义
    // let tell = function* (){
    //     yield 'a';
    //     yield 'b';
    //     yield 'c';
    // }

    // let k = tell();
    // console.log(k.next());
    // console.log(k.next());
    // console.log(k.next());
    // console.log(k.next());    
}
{
    // 抽奖的逻辑
    let draw = function(count){
        /* 具体逻辑 */
        console.log(`剩余${count}次`);
    }
    // 抽奖的次数控制 状态控制
    let residue = function* (count){
        while (count>0){
            count--;
            yield draw(count);
        }
    }
    // 实例化
    // let start = residue(5);

    // let btn = document.createElement('button');
    // btn.id = 'start';
    // btn.textContent= '抽奖';
    // document.body.appendChild(btn);
    // document.getElementById('start').addEventListener('click',function(){
    //     start.next();
    // })
}

// {
//     // 长轮询
//     let ajax = function* (){
//         yield new Promise(function(res,rej){
//             setTimeout(function(){
//                 res({code:200});
//             },200)
//         })
//     }
//     let pull = function(){
//         let gen = ajax();
//         let step = gen.next(); 
//         step.value.then(function(d){
//             if(d.code != 200){
//                 setTimeout(function(){
//                     console.log('wait');
//                     pull();
//                 },1000);
//             }else{
//                 console.log(d);
//             }
//         })
//     }

//     pull();
// }

{
    function* foo(x){
        let y = (yield (x+1));
        return (y+1);
    }

    var a = foo(5);
    console.log(a.next());
    console.log(a.next());
    console.log(a.next());
}
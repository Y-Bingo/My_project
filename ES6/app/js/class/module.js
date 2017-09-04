// export let a = 123;

// export function test(){
//     console.log('test');
// }

// export class Hello{
//     hello(){
//         console.log('hello world');
//     }
// }

let a =123;
let test = function(){
    console.log('test');
}
class Hello{
    test(){
        console.log('class Hello');
    }
}

// 推荐使用
// default把命名交给引用方
// 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
export default {
    a,
    test,
    Hello
}
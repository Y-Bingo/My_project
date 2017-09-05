{
    console.log('糖',`\u5858`);
    console.log('test','\u23433');

    console.log('s',`\u{23433}`)
}
{
    let s = '𣐳';
    console.log('length',s.length);
    console.log('0',s.charAt(0));
    console.log('1',s.charAt(1));
    console.log('c1',s.charCodeAt(0));
    console.log('c2',s.charCodeAt(1));

    let s1 = '𣐳';
    console.log('length',s1.length);
    console.log('code0',s1.codePointAt(0).toString(16));
    console.log('code1',s1.codePointAt(1));
}

{
    console.log(String.fromCharCode('0x20bb7'));
    console.log(String.fromCodePoint('0x20bb7'));  
}

{
    let str = '\u{20bb7}abd';
    // es5的字符串遍历
    for(let i =0;i<str.length;i++){
        console.log('es5',str[i]);
    }
    // es6的字符串遍历
    for(let i of str){
        console.log('es6',i);
    }    
}
{
    let str = 'string';
    console.log('includes',str.includes('r'));
    console.log('start',str.startsWith('str'));
    console.log('end',str.endsWith('ing'));
}
{
    let str = 'abc';
    console.log("repeat",str.repeat(3));
}
{
    let name = 'list';
    let info = 'hello world';
    let m = `i am ${name},${info}`;
    console.log(m);
}
{
// 标签模版
    let user = {
        name : 'list',
        info : 'hello world'
    }
    console.log(abc`i am ${user.name},${user.info}`);
    function abc(s,v1,v2){
        console.log(s,v1,v2);
        return s+v1+v2;
    }
}
{
    // raw把所有转移字符不转移
    // console.log()
}
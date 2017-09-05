{
    // es5的写法
    let regex = new RegExp('xyz','i');
    let regex2 = new RegExp(/xyz/i);
    console.log('regex',regex.test('qxyz123'));
    console.log('regex2',regex2.test('qxyz123'))    
    // es6的写法
    let regex3 = new RegExp(/xyz/ig,'i');
    console.log('regex3',regex3.flags);//flags用来获取修饰符
}

{
    let s = 'bbb_bb_b';
    let a1= /b+/g;
    let a2= /b+/y;
    console.log('1',a1.exec(s),a2.exec(s));
    console.log('2',a1.exec(s),a2.exec(s));

    console.log(a1.sticky,a2.sticky);//判断是否开启了y模式
}
{
    // 处理的字符串中存在大于两个字节的字符用u模式来匹配
    // '.' 只能匹配任何小于等于两个字节的字符，不能匹配/,\n,\t, 可用s来解决
    // console.log('u-1',)
}
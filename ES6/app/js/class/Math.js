{
    // 二进制
    console.log(0b11110);
    // 八进制
    console.log(0o767);
}
{
    console.log('15',Number.isFinite(15));
    console.log('NaN',Number.isFinite(NaN));
    console.log('1/0',Number.isFinite(1/0));
    console.log('NaN',Number.isNaN());
}

{
    console.log('23',Number.isInteger(23));
    console.log('23.0',Number.isInteger(23.0));    
    console.log('23.1',Number.isInteger(23.1)); 
    console.log('s23',Number.isInteger('23'));           
}
{
    console.log(Number.MAX_SAFE_INTEGER);
    console.log(Number.MIN_SAFE_INTEGER);
    // isSaveInteger 判断是否在整型范围内
}
{
    console.log(2.1,Math.trunc(2.1));
    console.log(2.9,Math.trunc(2.9));    
}
{
    console.log(-4,Math.sign(-4))
    console.log(0,Math.sign(0))
    console.log(4,Math.sign(4))    
    console.log('d',Math.sign('d'))    
}
{
    // cbrt 立方根
}
{
    let obj ={
        time : '2017-03-11',
        name : 'net',
        _r   : 123
    }
    let monitor = new Proxy(obj,{
        // 拦截对象的属性读取
        get(target,key){
            return target[key].replace('2017','2018');
        },
        // 拦截对象的设置属性
        set(target,key,value){
            if(key === 'name'){
                return target[key]=value;
            }else{
                return target[key];
            }
        },
        // 拦截key in object的操作
        has(target,key){
            if(key === '_r'){
                return target[key];
            }else{
                return false;
            }
        },
        deleteProperty(target,key){
            if(key.indexOf('_') >-1){
                delete target[key];
                return true;
            }else{
                return target[key];
            }
        }
    });
    console.log('get',monitor.time);
    monitor.time = '11111';
    monitor.name = 'yb';
    console.log('set',monitor.time);
    console.log('set',monitor.name);
    console.log('in','name' in monitor);
    delete monitor._r ;
    console.log('delete',monitor);

}
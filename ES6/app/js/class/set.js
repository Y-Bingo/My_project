{
    console.log('分割线----------------------------------------');    
    let list = new Set([1,4,3,4,3]);
    console.log('list',list);
}
{
    console.log('分割线----------------------------------------');
    
    let list  = new Set();
    list.add(3);
    list.add(4);
    console.log("list2",list);
}
{
    console.log('分割线----------------------------------------');
    
    let arr = ['add','delete','has']
    let list = new Set(arr);

    console.log('has',list.has('add'));
    console.log('delete',list.delete('add'),list);
    list.clear();
    console.log('list',list);
}
{
    console.log('分割线----------------------------------------');
    let arr = ['add','delete','has']
    let list = new Set(arr);
    
    for(let key of list.keys()){
        console.log('keys',key);
    }
    for(let val of list.values()){
        console.log('val',val);
    }
    for(let [key,val] of list.entries()){
        console.log('entries',key,val);
    }
    list.forEach( item =>{
        console.log(item);
    })
}

{
    console.log('分割线----------------------------------------');

    let arr = ['a1','a2','a3']
    let list = new Set(arr);
    console.log('val',list.a1);
}

{
    console.log('分割线----------------------------------------');
    let weaklist = new WeakSet(); 
    
    let arg ={};
    weaklist.add(arg);

    console.log('weakList',weaklist);
}
{
    console.log('分割线----------------------------------------');
    let set = new Set();
    let item = {"t":5};
    set.add(item);
    console.info('set',set);
    item.t = 34;
    console.info('set',set);
}

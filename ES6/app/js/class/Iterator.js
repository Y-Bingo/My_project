{
    let obj ={
        'start' : [1,2,3],
        'end'   : [4,5,6],
        [Symbol.iterator]:function(){
            let self = this;
            let index =0;
            // 合并数组
            let arr = self.start.concat(self.end);
            let len =arr.length;
            return {
                next: function(){
                    if(index < len){
                        return {
                            value: arr[index++],
                            done : false
                        }
                    }else{
                        return {
                            value : arr[index++],
                            done :true
                        }
                    }
                }
            }
        }
    }
    let map = obj[Symbol.iterator]();
    console.log(map.next());
    console.log(map.next());
    console.log(map.next());
    console.log(map.next());
    console.log(map.next());
    
}

{
    let arr = ['1','2','3'];
    // let may = arr[Symbol.iterator]();
    // console.log(may.next());
    // console.log(may.next());
    // console.log(may.next());
    // console.log(may.next());
    // console.log(may.next());
    for(let key of arr){
        console.log(key);
    }
}
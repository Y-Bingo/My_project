function test(){
    let a =2;
    for(var i=1;i<3;i++){
        console.log(i);
    }
    console.log(i);
}

function test_const(){
    const k = {a:1,b:2}
    k.a = 3;
    console.log(k);
}

test_const()
// test();
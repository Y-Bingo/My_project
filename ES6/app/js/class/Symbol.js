{   

    let a = Symbol("3");
    let d = Symbol('3');
    let b =3;
    let c =3;
    console.log(a===d);
}

{
    let te = 'abc';
    let a = Symbol.for(te);
    let b = Symbol.for("dd");
    console.log('a==b?',a===b);
    let obj = {
        [a] : 123,
        a   : '123d',
        [b]   : 'dd'
    }
    let sybarr = Object.getOwnPropertySymbols(obj)
    console.log("sybarr",sybarr);
    let sybarr2 = Reflect.ownKeys(obj);
    console.log("sybarr2",sybarr2);
}

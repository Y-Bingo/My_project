{
    class Parent{
        constructor(name='imooc'){
            this.name = name ;
        }
    }

    let imooc = new Parent();
    console.log('构造函数实现',imooc);
}
// 继承
{
    class Parent{
        constructor(name = "yb"){
            this.name = name ;
        }
    }

    class Child extends Parent{
        
    }

    console.log('继承',new Child())
}
// 继承与覆盖
{
    class Parent{
        constructor(name = "yb"){
            this.name = name ;
        }
    }

    class Child extends Parent{
        constructor(name='bingo'){
            super(name);
            this.age = 3;
        }
     
    }

    console.log('继承',new Child('gg'))
}
// get与set
{
    class Parent{
        constructor(name = "yb"){
            this.name = name ;
        }
        get getname(){
            return "my name is "+ this.name
        }
        set getname(value){
            this.name = value;
        }
    }
    let p = new Parent('le');
    console.log('get',p.getname);
    p.getname = 'omg';
    console.log('set',p.getname);
}
// 静态方法
{
    class Parent{
        constructor(name = "yb"){
            this.name = name ;
        }
        // 只能too难过类调用，不能通过类的实例调用
        static talk(){
            console.log('static');
        }
    }

    Parent.talk();
}
// 静态属性
{
    class Parent{
        constructor(name = "yb"){
            this.name = name ;
        }
        // 只能too难过类调用，不能通过类的实例调用
        static talk(){
            console.log('static');
        }
    }
    Parent.type = 'test';
    console.log('静态属性',Parent.type);
}
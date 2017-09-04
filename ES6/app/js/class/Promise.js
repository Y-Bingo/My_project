{
    // 基本定义
    let ajax = function (callback){
        console.log('执行');
        setTimeout(function() {
            callback && callback.call();
        }, 1000);
    }

    // ajax(function(){
    //     console.log('执行完毕');
    // })
}

{
    let ajax = function (){
        console.log('执行2');
        return new Promise(function(resolve,reject){
            setTimeout(function() {
                resolve();
            }, 1000);
        }) 
    }

    // ajax().then(function(){
    //     console.log('promise','执行完毕2');
    // })
}
{
    let ajax = function (){
        console.log('执行1');
        return new Promise(function(resolve,reject){
            setTimeout(function() {
                resolve();
            }, 1000);
        }) 
    }

    // ajax().then(function(data){
    //     console.log('promise','执行完毕1');
        
    //     return new Promise(function(res,rej){
    //             console.log('执行2');
    //             setTimeout(function() {
    //                 res();
    //         }, 1000);
    //     });

    // }).then(function(){

    //     console.log('promise','执行完毕2');
        
    // })
}

{
    // 所有图片加载往后再加载页面
    function loading(src){
        return new Promise(function(res,rej){
            let img = document.createElement('img');
            img.src = src ;
            img.onload = function(){
                res(img);
            }
            img.onerror = function(err){
                rej(err);
            }
        })
    }
    function showImgs(imgs){
        imgs.forEach(function(img) {
            document.body.appendChild(img);
        });
    }
    // Promise.all([
    //     loading("https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d92664c617950a7b753549c232ea05e4/b2de9c82d158ccbff9af8aca13d8bc3eb135412a.jpg"),
    //     loading("https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d92664c617950a7b753549c232ea05e4/b2de9c82d158ccbff9af8aca13d8bc3eb135412a.jpg"),
    //     loading('https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d92664c617950a7b753549c232ea05e4/b2de9c82d158ccbff9af8aca13d8bc3eb135412a.jpg')
    // ]).then(showImgs)
    // .catch(function(err){
    //     console.log('图片地址有误',err);
    // })
}
//race
{
    function loading(src){
        return new Promise(function(res,rej){
            let img = document.createElement('img');
            img.src = src ;
            img.onload = function(){
                res(img);
            }
            img.onerror = function(err){
                rej(err);
            }
        })
    }
    function showImgs(img){
            let p = document.createElement('p');
            p.appendChild(img);
            document.body.appendChild(p);
    }
    Promise.race([
        loading("https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d92664c617950a7b753549c232ea05e4/b2de9c82d158ccbff9af8aca13d8bc3eb135412a.jpg"),
        loading("https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d92664c617950a7b753549c232ea05e4/b2de9c82d158ccbff9af8aca13d8bc3eb135412a.jpg"),
        loading('https://gss.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d92664c617950a7b753549c232ea05e4/b2de9c82d158ccbff9af8aca13d8bc3eb135412a.jpg')
    ]).then(showImgs)
    .catch(function(err){
        console.log('图片地址有误',err);
    })
    
}
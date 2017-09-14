var game = null;
var data = [];
var keymusic = null
var start = null;
var backmusic = null;

window.onload = function() {
	game = document.getElementById("game");
	keymusic = document.getElementById("keymusic");
	start = document.getElementById("start");
	backmusic = document.getElementById("backmusic");
	start.onclick = function() {
		init();
		this.style.left = "360px";
		backmusic.play();
	}
}

function init() {
	if (data.length) {
		for (var i = 0; i < data.length; i++) {
			setdiv(data[i],0);//清除样式
		} 
	}else {
			var temp;
			for (var i = 0; i < 16; i++) {
				temp = document.createElement("div");
				data.push(temp); //把节点temp压进data里面
				game.appendChild(temp); //appendChild() 方法向节点添加最后一个子节点
			}
	}
		randomrum();
		randomrum();
	}
	document.onkeydown = function(e) {
		if (e.keyCode == 39) { //向左
			count(data[0], data[1], data[2], data[3]);
			count(data[4], data[5], data[6], data[7]);
			count(data[8], data[9], data[10], data[11]);
			count(data[12], data[13], data[14], data[15]);
			randomrum();
		} else if (e.keyCode == 38) { //向上
			count(data[12], data[8], data[4], data[0]);
			count(data[13], data[9], data[5], data[1]);
			count(data[14], data[10], data[6], data[2]);
			count(data[15], data[11], data[7], data[3]);
			randomrum();
		} else if (e.keyCode == 37) { //向右
			count(data[3], data[2], data[1], data[0]);
			count(data[7], data[6], data[5], data[4]);
			count(data[11], data[10], data[9], data[8]);
			count(data[15], data[14], data[13], data[12]);
			randomrum();
		} else if (e.keyCode == 40) { //向下
			count(data[0], data[4], data[8], data[12]);
			count(data[1], data[5], data[9], data[13]);
			count(data[2], data[6], data[10], data[14]);
			count(data[3], data[7], data[11], data[15]);
			randomrum();
		}
	}



	function count(d1, d2, d3, d4) {
		var temp = [d1, d2, d3, d4]; //定义一个装四个格子的数组

		var first, next; //类指针，前与后
		for (var i = temp.length - 1; i > 0; i--) {
			first = temp[i].innerHTML; //把最后一个格子里面的数给first
			if (first == "" || first.length == 0) {
				continue; //如果数值为空或者是0，那么就跳出这次循环，进行下一个格子的查找

			}
			for (var j = i - 1; j >= 0; j--) {
				next = temp[j].innerHTML; //把first后面的那个格子的数值赋给next
				if (next == "" || next.length == 0) {
					continue; //如果数值为空或者是0，那么就跳出这次循环，进行下一个格子的查找
				} else if (first == next) { //如果first=next，则翻倍
					setdiv(temp[i],next*2) //把first的值翻倍//给与对应的数值的颜色

					setdiv(temp[j],0)//置空next里面的格子//清除div的样式
					move(temp[i]); //特征显示
//					keymusic.play();
					break; //跳出二级循环
				} else if (first != next) {
					break; //跳出二级循环
				}
			}
		}
		//移位=不空的覆盖空的
		for (var i = temp.length - 1; i > 0; i--) { //前
			first = temp[i].innerHTML;
			if (first == "" || first.length == 0) { //后
				for (var j = i - 1; j >= 0; j--) {
					next = temp[j].innerHTML;
					if (next == "" || next.length == 0) {
						continue; //结束二级循环
					} else {
						setdiv(temp[i],next)//把next的的样式赋给空的格子

						setdiv(temp[j],0) //清除样式
						break ;
					}
				}
			}
		}
	}

	function move(d1) {
		d1.style.transform = "scale(1.3)"; //放大1.2倍
		setTimeout(function() {
			d1.style.transform = "scale(1)"; //回复原来size
		}, 200)
	}
	
function setdiv(G,num){
	if(num==0){
		G.innerHTML="";
		G.removeAttribute("class");
	}else{
	G.innerHTML=num;
	G.setAttribute("class","d"+num);
		}
}

	function randomrum() { //随机出两个格子的数字
		var tempdiv = []; //声明存储没有内容的数组
		for (i = 0; i < data.length; i++) {
			if (data[i].innerHTML == "") { //把没有内容的格子都压进temp数组里面
				tempdiv.push(data[i]);
			}
		}
		if (tempdiv.length == 0) { //判断格子是否塞满

			start.style.left = "0px";
			backmusic.pause();
			return;
		}
		var num = Math.random() > 0.7 ? 4 : 2; //难度系数为0.7，即出现4的概率为30%
		var index = Math.floor(Math.random() * tempdiv.length); //随机temp中的其中一个div
		setdiv(tempdiv[index],num);

		tempdiv[index].style.transform = "rotateY(180deg)";
		setTimeout(function() {
			tempdiv[index].style.transform = "rotate(0deg)";
		}, 220);

	}
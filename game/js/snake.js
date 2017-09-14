var game = null;
var data = [];
var snake = [];
var thread = null;
var direction = "right";
window.onload = function() {
	game = document.getElementById("game");
	intial();
	food1();
	food2();
	show();
	thread = setInterval(function() {
		//预判蛇还能不能走，即是否超出范围
		var next = 0;
		//方向为右
		if (direction == "right") { //向右移动y轴+1
			next = {
					x: snake[0].x,
					y: snake[0].y + 1
				} //由于第一个与第二个公用一个对象，所以要重新赋一个对象给第一个
		} else if (direction == "left") { //向左移动Y轴-1
			next = {
				x: snake[0].x,
				y: snake[0].y - 1
			}
		} else if (direction == "down") { //向下移动X轴坐标+1
			next = {
				x: snake[0].x + 1,
				y: snake[0].y
			}
		} else if (direction == "up") { //向上移动X轴坐标-1
			next = {
				x: snake[0].x - 1,
				y: snake[0].y
			}
		}
		if (next.x < 0 || next.x >= 30 || next.y < 0 || next.y >= 50) {
			alert("蛇死了");
			clearInterval(thread);
			return;
		}
		//蛇吃食物算法
		if (data[next.x][next.y].getAttribute("class")=="food1") {//判断div是否有样式
			data[next.x][next.y].setAttribute("class","show");
			snake.push(next);
			food1();
		}
		//蛇吃食物算法
		if (data[next.x][next.y].getAttribute("class")=="food2") {//判断div是否有样式
			alert("食物中毒了！！！我死了！！")
		}

		//除去蛇为移动后的样式
		for (var i = 0; i < snake.length; i++) {
			data[snake[i].x][snake[i].y].removeAttribute("class");
		}
		//蛇的移动，前一个的坐标值给后一格
		for (var i = snake.length - 1; i > 0; i--) {
			snake[i] = snake[i - 1];
		}


		snake[0] = next;
		show();

	}, 150);
}

//按钮事件设置
document.onkeypress = function(e) {
	if ((e.keyCode == 97|| e.keyCode==37) && direction != "right") { //向左
		direction = "left";
	} else if ((e.keyCode == 100 || e.keyCode==39) && direction != "left") { //向右
		direction = "right";
	} else if ((e.keyCode == 115 || e.keyCode==40) && direction != "up") { //向下
		direction = "down";
	} else if ((e.keyCode == 119 || e.keyCode==38) && direction != "down") { //向上
		direction = "up";
	}
}


//初始化棋盘
function intial() {

	for (var i = 0; i < 30; i++) {
		var row = [];
		var temp = null;
		for (var j = 0; j < 50; j++) {
			temp = document.createElement("div");
			row.push(temp)
			game.appendChild(temp);
		}
		data.push(row);
	}
	//初始化蛇
	snake[0] = {
		x: 0,
		y: 2
	};
	snake[1] = {
		x: 0,
		y: 1
	};
	snake[2] = {
		x: 0,
		y: 0
	};
}

function show() {

	//显示蛇
	var temp = 0;
	for (var i = 0; i < snake.length; i++) {
		temp = snake[i];
		data[temp.x][temp.y].setAttribute("class", "show"); //设置蛇身的div

	}
}

function food1() {
	do {
		var row = Math.floor(Math.random() * 30);
		var col = Math.floor(Math.random() * 50);
	} while (data[row][col].getAttribute("class") != null);
	data[row][col].setAttribute("class", "food1");
}
function food2() {
	do {
		var row = Math.floor(Math.random() * 30);
		var col = Math.floor(Math.random() * 50);
	} while (data[row][col].getAttribute("class") != null);
	data[row][col].setAttribute("class", "food2");
}
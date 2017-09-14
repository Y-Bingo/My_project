var cx = null;
var shap = null;
var can = null;
var isdraw = null;
var color = "black";
var linewidth = 1;
var p1 = {
	x: 0,
	y: 0
};
var p2 = {
	x: 0,
	y: 0
};
window.onload = function() {
	can = document.getElementById("tuya");
	cx = can.getContext("2d");
	//铅笔工具
	document.getElementById("pen").onclick = function() {
		drawPen();
}

//画直线
	document.getElementById("line").onclick = function() {
		drawline();
	}
	document.getElementById("clear").onclick = function() {
		cx.clearRect(0, 0, can.width, can.height);
	}
	
	//颜色
	document.getElementById("red").onclick = function() {
			color = "red";
		}
	document.getElementById("blue").onclick = function() {
			color = "blue";
		}
	document.getElementById("green").onclick = function() {
			color = "green";
		}
		
		//线宽
	document.getElementById("linewidth").onchange = function() {
		linewidth = this.value;
	}
	//画长方形
	document.getElementById("rect").onclick = function() {
		drawrect();
	}
	//画圆
	document.getElementById("circle").onclick = function() {
		drawcircle();

	}
	//橡皮擦工具
	document.getElementById("eraser").onclick = function() {
		erascer();
	}


}

//铅笔
function drawPen(e) {
	can.onmousedown = can.onmousemove = can.onmouseup = can.onmouseleave = null; // 解除书表绑定事件，即清空，置为null
	can.onmousedown = function(e) {
		isdraw = true;
		cx.beginPath();
		cx.strokeStyle = color;
		cx.lineWidth = linewidth;
		cx.moveTo(e.clientX, e.clientY);
	}
	can.onmousemove = function(e) {
		if (isdraw) {
			cx.lineTo(e.clientX, e.clientY);
			cx.stroke();

		}

	}
	can.onmouseup = function() {
		isdraw = false;
		cx.closePath();

	}
	can.onmouseleave = function() {
		isdraw = false;
		cx.closePath();
	}
}

//画直线
function drawline(e) {
	can.onmousedown = can.onmousemove = can.onmouseleave = can.onmouseup = null;
	can.onmousedown = function(e) {
		isdraw = true;
		cx.beginPath();
		cx.strokeStyle = color;
		cx.lineWidth = linewidth;

		p1.x = e.clientX;
		p1.y = e.clientY;


		cx.moveTo(p1.x, p1.y);
	}
	can.onmouseup = can.onmouseleave = function(e) {
		if (isdraw) {
			p2.x = e.clientX;
			p2.y = e.clientY;
			cx.lineTo(p2.x, p2.y);
			cx.stroke();
			cx.closePath();
			isdraw = false;
		}
	}
}

function drawrect() {
	can.onmousedown = can.onmousemove = can.onmouseleave = can.onmouseup = null;
	can.onmousedown = function(e) {
		isdraw = true;
		cx.beginPath();
		cx.strokeStyle = color;
		cx.lineWidth = linewidth;

		p1.x = e.clientX;
		p1.y = e.clientY;


		cx.moveTo(p1.x, p1.y);
	}
	can.onmouseup = can.onmouseleave = function(e) {
		if (isdraw) {
			p2.x = e.clientX;
			p2.y = e.clientY;
			cx.strokeRect(p1.x, p1.y, Math.abs(p2.x - p1.x), p2.y - p1.x);
			cx.stroke();
			cx.closePath();
			isdraw = false;
		}
	}
}

function drawcircle() {
	can.onmousedown = can.onmousemove = can.onmouseleave = can.onmouseup = null;
	can.onmousedown = function(e) {
		isdraw = true;
		cx.beginPath();
		cx.strokeStyle = color;
		cx.lineWidth = linewidth;

		p1.x = e.clientX;
		p1.y = e.clientY;
	}
	can.onmouseup = can.onmouseleave = function(e) {
		if (isdraw) {
			p2.x = e.clientX;
			p2.y = e.clientY;
			var ra = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

			cx.arc(p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2, ra / 2, 0, Math.PI * 2, true);
			cx.stroke();
			cx.closePath();
			isdraw = false;
		}
	}
}


function erascer() {
	can.onmousedown = can.onmousemove = can.onmouseleave = can.onmouseup = null;
	can.onmousedown = function(e) {
		isdraw = true;
	}
	can.onmousemove = function(e) {
		if (isdraw) {
			p2.x = e.clientX;
			p2.y = e.clientY;

			cx.clearRect(p2.x - linewidth, p2.y - linewidth, linewidth * 2, linewidth * 2);
		}
	}
	can.onmouseup = function (){
		isdraw = false;
	}



}
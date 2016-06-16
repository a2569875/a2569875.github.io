//class RouteData : public DrawData
RouteData.prototype = new DrawData();
RouteData.prototype.constructor = RouteData;
RouteData.uber = DrawData.prototype;
function RouteData(points, pid, box) {
	//Liner_Vector array
	this.points = points;
	this.pid = pid;
	all_obj[pid] = this;
	//////////////////////////
	this.box = box;
	this.obj = document.createElementNS(this.xmlns,'g');
	this.box.appendChild(this.obj);
}
RouteData.prototype.get_path_at = function(val){
	if(val > 1)val = 1;
	if(val < 0)val = 0;
	if(val == 1){
		return this.points[this.points.length - 1]
	}
	if(val == 0){
		return this.points[0]
	}
	val = (this.points.length - 1)
	//好像指標~~
	*val
	//好像指標~~
	//C++中毒~~
	;
	var index = Math.floor(val);
	return (new Liner_Vector(this.points[index],this.points[index+1])).get_part(val - index);
}
RouteData.prototype.set_point_at = function(index,point1){
	if(index < this.points.length){
		this.points[index] = point1;
		//alert(point1.x);
		var this_obj = document.getElementById(this.pid.toString() + "|" + index);
		this_obj.setAttributeNS (null, "cx",point1.x);
		this_obj.setAttributeNS (null, "cy",point1.y);
		if(index > 0){
			//console.log(this.pid.toString() + "&" + (index-1));
			var lin1 = document.getElementById(this.pid.toString() + "&" + (index-1));
			lin1.setAttributeNS (null, "x2",point1.x);
			lin1.setAttributeNS (null, "y2",point1.y);
		}
		if(index <this.points.length-1){
			var lin1 = document.getElementById(this.pid.toString() + "&" + index);
			lin1.setAttributeNS (null, "x1",point1.x);
			lin1.setAttributeNS (null, "y1",point1.y);
		}
	}
}
function ball_mouse_click(){
	var pid = this.getAttributeNS(null,"id");
	//alert(pid);
	var g_pid = all_obj[(pid.split("|"))[0]];
	//alert(g_pid);
	if(g_pid){
		
		if(((this.getAttributeNS (null, "class")).split("|"))[1] == "true"){
			this.setAttributeNS (null, "class",((this.getAttributeNS (null, "class")).split("|"))[0] + "|false");
			this.setAttributeNS (null, "fill","lightgrey");
		}else{
			this.setAttributeNS (null, "class",((this.getAttributeNS (null, "class")).split("|"))[0] + "|true");
			this.setAttributeNS (null, "fill","red");
		}
		
		//alert(((this.getAttributeNS (null, "class")).split("|"))[1] == "true");
		var str = "";
		for (var i=0; i<g_pid.points.length; i++) {
			str += "(" + g_pid.points[i].x + "," + g_pid.points[i].y + "),";
		}
		//alert(str);
	}
}
var mouse_x;
var mouse_y;
function ball_mouse_move(event){
	event = event || window.event; 
	if(mouse_x){}else{
		mouse_x = event.pageX;
	}
	if(mouse_y){}else{
		mouse_y = event.pageY;
	}
	var pid = this.getAttributeNS(null,"id");
	//dot.style.left = event.pageX + "px";
    //dot.style.top = event.pageY + "px";
	//alert(pid);
	//console.log(pid);
	var g_pid = all_obj[(pid.split("|"))[0]];
	//alert(g_pid);
	if(g_pid){
		if(((this.getAttributeNS (null, "class")).split("|"))[1] == "true"){
			var ttt = (g_pid.points[parseInt((pid.split("|"))[1])]).add(
					new Point(
						(event.pageX - mouse_x)*2,
						(event.pageY - mouse_y)*2
					)
				)
				//console.log("(" + ttt.x + "," + ttt.y + ")");
			g_pid.set_point_at(parseInt((pid.split("|"))[1]),
				(g_pid.points[parseInt((pid.split("|"))[1])]).add(
					new Point(
						(event.pageX - mouse_x)/8,
						(event.pageY - mouse_y)/8
					)
				)
			);
		}
	}
	//console.log("(" + mouse_x + "," + mouse_y + ")");
	mouse_x = event.pageX;
	mouse_y = event.pageY;
}
RouteData.prototype.hide = function () {
	this.obj.innerHTML = "";
}
RouteData.prototype.draw = function () {
	this.obj.innerHTML = "";
	for (var i=0; i<this.points.length; i++) {
		if(i < this.points.length-1){
			var lin = new LineData(this.points[i],this.points[i+1],1,this.obj);
			this.obj.appendChild(lin.obj);
			lin.draw();
			lin.obj.setAttributeNS (null, "id",this.pid + "&" + i);
			lin.obj.setAttributeNS (null, "stroke-dasharray","1,1");
			lin.obj.setAttributeNS (null, "stroke", "black");
		}
	}
	for (var i=0; i<this.points.length; i++) {
		if(i==0){
			var cir = new CircleData(this.points[i].x,this.points[i].y,5,this.obj);
			this.obj.appendChild(cir.obj);
			cir.obj.setAttributeNS(null, "stroke", "blue");
			cir.obj.setAttributeNS(null, "stroke-width", 1);
			cir.draw();
		}else if(i < this.points.length-1){
			var cir = new CircleData(this.points[i].x,this.points[i].y,5,this.obj);
			this.obj.appendChild(cir.obj);
			cir.draw();
		}else{
			var cir = new CircleData(this.points[i].x,this.points[i].y,5,this.obj);
			this.obj.appendChild(cir.obj);
			cir.draw();
		}
		cir.obj.setAttributeNS (null, "class",this.pid + "|false");
		cir.obj.setAttributeNS (null, "id",this.pid + "|" + i);
		cir.obj.addEventListener( "click", ball_mouse_click, false );
		cir.obj.addEventListener( "mousemove", ball_mouse_move, false );
	}
	//this.obj.setAttributeNS (null, "cx",this.x);
	//this.obj.setAttributeNS (null, "cy",this.y);
	//this.obj.setAttributeNS (null, "r", this.r);
	//this.obj.setAttributeNS (null, "fill", "lightgrey");
}
RouteData.prototype.show_message = function () {
	alert(this.x + ", " + this.y + ", r=" + this.r);
}
//end RouteData
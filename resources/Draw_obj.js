/*struct Liner_Vector{
	Point p1;
	Point p1;
}*/
function Liner_Vector(p1,p2){
	this.p1 = p1;
	this.p2 = p2;
}
Liner_Vector.prototype.get_part = function (val){
	return this.p2.translant(this.p1).scaling(val).add(this.p1);
}
//end Liner_Vector

/*struct Point{
	int x;
	int y;
}*/
function Point(x, y){
	this.x = x;
	this.y = y;
}
Point.prototype.translant = function (pt) {
	return new Point(this.x - pt.x, this.y - pt.y);
}
Point.prototype.add = function (pt) {
	return new Point(this.x + pt.x, this.y + pt.y);
}
Point.prototype.scaling = function (val) {
	return new Point(this.x * val, this.y * val);
}
//end Point

//class DrawData (³Ì¤÷class)
function DrawData(box) {
	///////////////////////
	this.box = box;
}
DrawData.prototype.xmlns = "http://www.w3.org/2000/svg";
DrawData.prototype.draw = function () {}
DrawData.prototype.show_message = function () {
	alert("void shape");
}
DrawData.prototype.set_location = function (pt) {}
DrawData.prototype.move = function (times, route, move_speed) {
	
	this.moving_times = times;
	this.moving_times_max = times;
	this.moving_route = times;
	this.moving_route = route;
	now_run.can_run = false;
	
	this.now_moving = setInterval( (function(self) {         //Self-executing func which takes 'this' as self
         return function() {   //Return a function in the context of 'self'
			self.moving_times--
			var tmp_pt = self.moving_route.get_path_at(self.moving_times/self.moving_times_max);
             self.set_location(tmp_pt); //Thing you wanted to run as non-window 'this'
			 self.draw();
			if(self.moving_times<=0){
				clearInterval(self.now_moving);
				now_run.can_run = true;
			}
         }
     })(this), move_speed);
}

//end DrawData

//class CircleData : public DrawData
CircleData.prototype = new DrawData();
CircleData.prototype.constructor = CircleData;
CircleData.uber = DrawData.prototype;
function CircleData(x, y, r, box) {
	this.x = x;
    this.y = y;
    this.r = r;
	//////////////////////////
	this.box = box;
	this.obj = document.createElementNS(this.xmlns,'circle');
	this.box.appendChild(this.obj);
}
CircleData.prototype.draw = function () {
	this.obj.setAttributeNS (null, "cx",this.x);
	this.obj.setAttributeNS (null, "cy",this.y);
	this.obj.setAttributeNS (null, "r", this.r);
	this.obj.setAttributeNS (null, "fill", "lightgrey");
}
CircleData.prototype.set_location = function (pt) {
	this.x = pt.x;
	this.y = pt.y;
}
CircleData.prototype.show_message = function () {
	alert(this.x + ", " + this.y + ", r=" + this.r);
}
//end CircleData


/////////////////////////////////////////////////////


//class CurveData : public DrawData
CurveData.prototype = new DrawData();
CurveData.prototype.constructor = CurveData;
CurveData.uber = DrawData.prototype;
function CurveData(p1,p2,ctr1,ctr2, box) {
	this.p1 = p1;
    this.p2 = p2;
    this.ctr1 = ctr1;
	this.ctr2 = ctr2;
	///////////////////////
	this.box = box;
	this.obj = document.createElementNS(this.xmlns,'path');
	this.box.appendChild(this.obj);
}
CurveData.prototype.set_location = function (pt) {
	var ctr_1 = this.ctr1.translant(this.p1);
	var ctr_2 = this.ctr2.translant(this.p1);
	var end_pt = this.p2.translant(this.p1);
	this.p2 = pt.add(end_pt);
	this.ctr1 = pt.add(ctr_1);
	this.ctr2 = pt.add(ctr_2);
	this.p1 = pt;
}
CurveData.prototype.draw = function () {
	this.obj.setAttributeNS (null, "d",this.get_d_val());
	this.obj.setAttributeNS (null, "stroke", "red");
	this.obj.setAttributeNS (null, "fill", "none");
}
CurveData.prototype.get_d_val = function () {
	var str = "M";
	str += Number(this.p1.x) + "," + Number(this.p1.y);
	var ctr_1, ctr_2, end_pt;
	//"M11,92c13-26,42,8,50-19"
	ctr_1 = this.ctr1.translant(this.p1);
	ctr_2 = this.ctr2.translant(this.p1);
	end_pt = this.p2.translant(this.p1);
	str = this.append_point_data(str, "c", ctr_1, ",");
	str += Number(ctr_2.x) + "," + Number(ctr_2.y);
	str = this.append_point_data(str, ",", end_pt, "");
	//console.log(str);
	return str;
}
CurveData.prototype.append_point_data = function (str_ ,start_, pt_ ,end_) {
	str_ += start_;
	str_ += Number(pt_.x);
	if(pt_.y >= 0){
		str_ += "+";
	}
	str_ += Number(pt_.y) + end_;
	return str_;
}

CurveData.prototype.show_message = function () {
	alert(this.x + ", " + this.y + ", r=" + this.r);
}
//end CurveData


/////////////////////////////////////////////////////


//class LineData : public DrawData
LineData.prototype = new DrawData();
LineData.prototype.constructor = LineData;
LineData.uber = DrawData.prototype;
function LineData(p1, p2, width, box) {
	this.p1 = p1;
    this.p2 = p2;
    this.width = width;
	this.box = box;
	this.obj = document.createElementNS(this.xmlns,'line');
	this.box.appendChild(this.obj);
}
LineData.prototype.draw = function () {
	//<line fill="none" stroke="#231815" stroke-miterlimit="10" x1="72.81" y1="25.385" x2="103.56" y2="79.635"/>
	this.obj.setAttributeNS (null, "stroke-width", this.width);
	this.obj.setAttributeNS (null, "fill", "none");
	this.obj.setAttributeNS (null, "stroke", "red");
	this.obj.setAttributeNS (null, "stroke-miterlimit", 10);
	this.obj.setAttributeNS (null, "x1",this.p1.x);
	this.obj.setAttributeNS (null, "y1",this.p1.y);
	this.obj.setAttributeNS (null, "x2",this.p2.x);
	this.obj.setAttributeNS (null, "y2",this.p2.y);
}
LineData.prototype.show_message = function () {
	alert(this.x + ", " + this.y + ", r=" + this.r);
}
//end LineData
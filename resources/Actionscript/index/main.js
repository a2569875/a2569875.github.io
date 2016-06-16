var test0, test1,test1_1, test2, testMan;
var point1,point2,pointct1,pointct2;
var linectr1, linectr2;
function start(){
	//var test = new CircleData(50,70,3,document.getElementById("draw_frame"));
	var btm;
	// = document.getElementById("circle_test");
	//btm.addEventListener( "click", circle_test, false );
	//btm = document.getElementById("curve_test");
	//btm.addEventListener( "click", curve_test, false );

	//btm = document.getElementById("show_man");
	//btm.addEventListener( "click", show_man, false );
	
	//	btm = document.getElementById("walk_test");
	//btm.addEventListener( "click", walk_test, false );
	
	
	//test.show_message();
	//test.draw();
	
	//test0 = new CircleData(10,10,10,document.getElementById("draw_frame"));
	
	//test1_1 = new CurveData(new Point(50,10), new Point(50,50), new Point(20,20), new Point(50,15),document.getElementById("draw_frame"));
	
	//test1 = new CurveData(new Point(10,50), new Point(50,50), new Point(20,20), new Point(40,80),document.getElementById("draw_frame"));
	//test1 = new CurveData(new Point(10,50), new Point(50,50), new Point(20,20), new Point(15,50),document.getElementById("draw_frame"));
	
	
	test2 = new LineData(new Point(0,66),new Point(58.33,123.33),1,document.getElementById("draw_frame"));//斜坡
	test2.draw();
	test2.obj.setAttributeNS (null, "stroke", "#abcdef");
	var test2_2 = new LineData(new Point(57.67,123.33),new Point(114,66),1,document.getElementById("draw_frame"));//斜坡
	test2_2.draw();
	test2_2.obj.setAttributeNS (null, "stroke", "#abcdef");
	
	var Man1 = new ManData(50,10,document.getElementById("draw_frame"));
	var Man2 = new ManData(50,10,document.getElementById("draw_frame"));
	Man1.start_walk();
	Man2.start_walk();
	
	//transform="scale(2,-2) translate(0,-100)"
	Man2.obj.setAttributeNS(null,"transform","scale(-1,1) translate(-115,0)");
	circle_test(Man1);
	circle_test(Man2);
	/*point1 = new CircleData(test1.p1.x,test1.p1.y,1,document.getElementById("draw_frame"));
	point2 = new CircleData(test1.p2.x,test1.p2.y,1,document.getElementById("draw_frame"));
	pointct1 = new CircleData(test1.ctr1.x,test1.ctr1.y,1,document.getElementById("draw_frame"));
	pointct2 = new CircleData(test1.ctr2.x,test1.ctr2.y,1,document.getElementById("draw_frame"));
	
	linectr1 = new LineData(test1.p1,test1.ctr1,0.5,document.getElementById("draw_frame"));
	linectr2 = new LineData(test1.p2,test1.ctr2,0.5,document.getElementById("draw_frame"));*/
	//testMan.draw();
}
function show_man(){
	testMan.draw();
}
function walk_test(){
	testMan.start_walk();
}
function get_color_oode(color0){
	return "#" + padLeft(color0[0].toString(16),2) + padLeft(color0[1].toString(16),2) + padLeft(color0[2].toString(16),2);
}
function padLeft(str,lenght){
    if(str.length >= lenght)
        return str;
    else
        return padLeft("0" +str,lenght);
}
function circle_test(man0){

	
	var route = new Liner_Vector(new Point(0,0),new Point(38,38));
	var color0 = [255,0,0];

	var color_step = 5;
	
	var part = 0;
	var id = setInterval(frame, 80);
	function frame() {
		if (false/*part == 100*/) {
			//clearInterval(id);
		} else {
			part++;
			if(color0[0] == 255 && (color0[1] < 255 && color0[1] >= 1) && color0[2] == 0){//red to yellow;
				color0[1]+=color_step;
			}else if(color0[0] == 255 && color0[1] == 255 && color0[2] == 0){//yellow to green 
				color0[0]-=color_step;
			}else if((color0[0] < 255 && color0[0] >= 1) && color0[1] == 255 && color0[2] == 0){//yellow to green
				color0[0]-=color_step;
			}else if(color0[0] == 0 && color0[1] == 255 && color0[2] == 0){//green to cyan
				color0[2]+=color_step;
			}else if(color0[0] == 0 && color0[1] == 255 && (color0[2] > 0 && color0[2] < 255)){//green to cyan
				color0[2]+=color_step;
			}else if(color0[0] == 0 && color0[1] == 255 && color0[2] == 255){//cyan to blue
				color0[1]-=color_step;
			}else if(color0[0] == 0 && (color0[1] < 255 && color0[1] >= 1) && color0[2] == 255){//cyan to blue
				color0[1]-=color_step;
			}else if(color0[0] == 0 && color0[1] == 0 && color0[2] == 255){//blue to purple
				color0[0]+=color_step;
			}else if((color0[0] > 0 && color0[0] < 255) && color0[1] == 0 && color0[2] == 255){//blue to purple
				color0[0]+=color_step;
			}else if(color0[0] == 255 && color0[1] == 0 && color0[2] == 255){//purple to red
				color0[2]-=color_step;
			}else if(color0[0] == 255 && color0[1] == 0 && (color0[2] < 255 && color0[2] >= 1)){//purple to red
				color0[2]-=color_step;
			}else if(color0[0] == 255 && color0[1] == 0 && color0[2] == 0){//red to yellow;
				color0[1]+=color_step;
			}else{
				color0 = [255,0,0];
			}
			if(color0[0] > 255)color0[0]=255;
			if(color0[1] > 255)color0[1]=255;
			if(color0[2] > 255)color0[2]=255;
			if(color0[0] < 0)color0[0]=0;
			if(color0[1] < 0)color0[1]=0;
			if(color0[2] < 0)color0[2]=0;
			//console.log(get_color_oode(color0));
			var result = ((part%200)>100) ? (200 -(part%200)):(part%200);
			var tmp_pt = route.get_part(result/100);
			man0.x = tmp_pt.x;
			man0.y = tmp_pt.y;
			man0.draw();
			man0.body.obj.setAttributeNS (null, "stroke", get_color_oode(color0));
			man0.head.obj.setAttributeNS (null, "fill",  get_color_oode(color0));
			man0.leg[0].obj.setAttributeNS (null, "stroke",  get_color_oode(color0));
			man0.leg[1].obj.setAttributeNS (null, "stroke",  get_color_oode(color0));
			man0.hand[0].obj.setAttributeNS (null, "stroke",  get_color_oode(color0));
			man0.hand[1].obj.setAttributeNS (null, "stroke",  get_color_oode(color0));
		}
	}
	test2.draw();
}
/*function curve_test(){
	//第二端點
	var route3 = new Liner_Vector(new Point(45,30),new Point(50,35));
	//第一控制點
	var route = new Liner_Vector(new Point(30,20),new Point(50,20));
	//第二控制點
	var route2 = new Liner_Vector(new Point(45,22),new Point(50,30));
	
	//第二端點
	var route3_1 = new Liner_Vector(new Point(45,30),new Point(50,35));
	//第一控制點
	var route_1 = new Liner_Vector(new Point(30,20),new Point(50,20));
	//第二控制點
	var route2_1 = new Liner_Vector(new Point(45,22),new Point(50,30));
	//	test1 = new CurveData(new Point(10,50), new Point(50,50), new Point(20,20), new Point(15,50),document.getElementById("draw_frame"));
	test1.p1 = new Point(50,10);//20 60
	test1.p2 = new Point(50,50);//20 100
	test1.ctr1 = new Point(20,20);//-10 70
	test1.ctr2 = new Point(50,15);//20 65
	
	test1_1.p1 = new Point(50,10);
	test1_1.p2 = new Point(50,50);
	test1_1.ctr1 = new Point(20,20);
	test1_1.ctr2 = new Point(50,15);
	var part = 0;
	var part_1 = part+100;
	var id = setInterval(frame, 10);
	function frame() {
		if (false/*part == 200) {
			clearInterval(id);
		} else {
			part++;
			part_1 = part + 100;
			//p1,p2,ctr1,ctr2
			var tmp_pt = route.get_part((part%200)/100);
			var temp_leg = part%200;
			if(temp_leg >= 100)temp_leg = 200-temp_leg;
			var tmp_pt3 = route3.get_part(temp_leg/100);
			var tmp_pt2 = route2.get_part((part%200)/100);
			if((part%200) > 100){
				tmp_pt = route.get_part((200-(part%200))/100);
				tmp_pt2 = route2.get_part((200-(part%200))/100);
			}
			//console.log(tmp_pt.x + "," + tmp_pt.y);
			//console.log(tmp_pt2.x + "," + tmp_pt2.y);
			test1.p2 = tmp_pt3;
			test1.ctr1 = tmp_pt;
			test1.ctr2 = tmp_pt2;
			test1.draw();
			
			point1.x = test1.p1.x;
			point1.y = test1.p1.y;
			point1.draw();
			point1.obj.setAttributeNS (null, "fill", "red");
			
			point2.x = test1.p2.x;
			point2.y = test1.p2.y;
			point2.draw();
			point2.obj.setAttributeNS (null, "fill", "red");
			
			pointct1.x = test1.ctr1.x;
			pointct1.y = test1.ctr1.y;
			pointct1.draw();
			
			pointct2.x = test1.ctr2.x;
			pointct2.y = test1.ctr2.y;
			pointct2.draw();
			
			linectr1.p1 = test1.p1;
			linectr1.p2 = test1.ctr1;
			linectr1.draw();
			linectr1.obj.setAttributeNS (null, "stroke-dasharray","1,1");
			linectr1.obj.setAttributeNS (null, "stroke", "black");
			
			linectr2.p1 = test1.p2;
			linectr2.p2 = test1.ctr2;
			linectr2.draw();
			linectr2.obj.setAttributeNS (null, "stroke-dasharray","1,1");
			linectr2.obj.setAttributeNS (null, "stroke", "black");
			
			tmp_pt = route_1.get_part((part_1%200)/100);
			temp_leg = part_1%200;
			if(temp_leg >= 100)temp_leg = 200-temp_leg;
			tmp_pt3 = route3_1.get_part(temp_leg/100);
			tmp_pt2 = route2_1.get_part((part_1%200)/100);
			if((part_1%200) > 100){
				tmp_pt = route_1.get_part((200-(part_1%200))/100);
				tmp_pt2 = route2_1.get_part((200-(part_1%200))/100);
			}
			test1_1.p2 = tmp_pt3;
			test1_1.ctr1 = tmp_pt;
			test1_1.ctr2 = tmp_pt2;
			test1_1.draw();
		}
	}
}
function curve_test2(){

	var route3 = new Liner_Vector(new Point(35,50),new Point(30,50));
	var route = new Liner_Vector(new Point(20,30),new Point(20,50));
	var route2 = new Liner_Vector(new Point(30,50),new Point(25,50));
	
	var part = 0;
	var id = setInterval(frame, 10);
	function frame() {
		if (false/*part == 200) {
			clearInterval(id);
		} else {
			part++;
			//p1,p2,ctr1,ctr2
			var tmp_pt = route.get_part((part%200)/100);
			var temp_leg = part%200;
			if(temp_leg >= 100)temp_leg = 200-temp_leg;
			var tmp_pt3 = route3.get_part(temp_leg/100);
			var tmp_pt2 = route2.get_part((part%200)/100);
			if((part%200) > 100){
				tmp_pt = route.get_part((200-(part%200))/100);
				tmp_pt2 = route2.get_part((200-(part%200))/100);
			}
			//console.log(tmp_pt.x + "," + tmp_pt.y);
			//console.log(tmp_pt2.x + "," + tmp_pt2.y);
			test1.p2 = tmp_pt3;
			test1.ctr1 = tmp_pt;
			test1.ctr2 = tmp_pt2;
			test1.draw();
		}
	}
}
*/
window.addEventListener( "load", start, false );
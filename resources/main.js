/**
 * the main ani
 * @author 00357123 �i�t�|
 * @author 00357127 �H�ټy
 */

var test0, test1,test1_1, test2, testMan;
var point1,point2,pointct1,pointct2;
var linectr1, linectr2;
var ani_test;
var all_obj;
var walk_speed, walk_speed;
function start(){
	walk_speed = 10;
	walk_speed_frame = 100;
	all_obj = [];
	var test = new CircleData(50,70,3,document.getElementById("draw_frame"));
	var btm = document.getElementById("ani_preview");
	btm.addEventListener( "click", ani_preview, false );
	
	btm = document.getElementById("ani_2_gif");
	btm.addEventListener( "click", ani_2_gif, false );
	

	//test.show_message();
	//test.draw();
	
	//test0 = new CircleData(10,10,10,document.getElementById("draw_frame"));
	
	//test1_1 = new CurveData(new Point(50,10), new Point(50,50), new Point(20,20), new Point(50,15),document.getElementById("draw_frame"));
	
	//test1 = new CurveData(new Point(10,50), new Point(50,50), new Point(20,20), new Point(40,80),document.getElementById("draw_frame"));
	//test1 = new CurveData(new Point(10,50), new Point(50,50), new Point(20,20), new Point(15,50),document.getElementById("draw_frame"));
	
	//test2 = new LineData(new Point(0,66),new Point(75,141),1,document.getElementById("draw_frame"));
	//test2.draw();
	
	//testMan = new ManData(50,10,document.getElementById("draw_frame"));
	
	//point1 = new CircleData(test1.p1.x,test1.p1.y,1,document.getElementById("draw_frame"));
	//point2 = new CircleData(test1.p2.x,test1.p2.y,1,document.getElementById("draw_frame"));
	//pointct1 = new CircleData(test1.ctr1.x,test1.ctr1.y,1,document.getElementById("draw_frame"));
	//pointct2 = new CircleData(test1.ctr2.x,test1.ctr2.y,1,document.getElementById("draw_frame"));
	
	//linectr1 = new LineData(test1.p1,test1.ctr1,0.5,document.getElementById("draw_frame"));
	//linectr2 = new LineData(test1.p2,test1.ctr2,0.5,document.getElementById("draw_frame"));
	
	//r0 = new RouteData([new Point(50,16),new Point(52,11),new Point(103,22),new Point(72,50)],0,document.getElementById("draw_frame"));
	//r0.draw();
	
	//ani_test = new AnimationData(basketball_fake, "STRING", 100, document.getElementById("draw_frame"));
	//ani_test.obj.setAttributeNS(null,"transform","translate(10,0) scale(0.5)");
	
	//testMan.draw();
}
var r0;
function circle_output(){
	walk_speed = 1;
	walk_speed_frame = 10;
	testMan.stop_walk();
	testMan.start_walk();
	grander = new gencoder();
	grander.init(250, 250, 80);
	circle_test();
}
function test_ani(){
	ani_test.draw();
	ani_test.play();
}
function show_man(){
	testMan.draw();
}
function walk_test(){
	testMan.start_walk();
}
function mirror_test(){
	//transform="scale(2,2) scale(-1,1)"
	testMan.obj.setAttributeNS (null, "transform","translate(" + (2 * testMan.x + 40) + ",0) scale(-1, 1)");
	
}
function circle_test(){

	//transform="scale(2,2) scale(-1,1)"
	//var route = new Liner_Vector(new Point(0,0),new Point(60,60));
	
	var part = 0;
	var id = setInterval(frame, 10);
	r0.hide();

	function frame() {
		if (part == 100) {
			clearInterval(id);
			r0.draw();
			grander.get_gif();
			walk_speed = 10;
			walk_speed_frame = 100;
			testMan.stop_walk();
		} else {
			part++;
			//var tmp_pt = route.get_part(part/100);
			var tmp_pt = r0.get_path_at(part/100);
			testMan.x = tmp_pt.x - 20;
			testMan.y = tmp_pt.y - 20;
			testMan.draw();
			FrameChanged();
		}
	}
	test2.draw();
}
function curve_test(){
	//�ĤG���I
	var route3 = new Liner_Vector(new Point(45,30),new Point(50,35));
	//�Ĥ@�����I
	var route = new Liner_Vector(new Point(30,20),new Point(50,20));
	//�ĤG�����I
	var route2 = new Liner_Vector(new Point(45,22),new Point(50,30));
	
	//�ĤG���I
	var route3_1 = new Liner_Vector(new Point(45,30),new Point(50,35));
	//�Ĥ@�����I
	var route_1 = new Liner_Vector(new Point(30,20),new Point(50,20));
	//�ĤG�����I
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
		if (false/*part == 200*/) {
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
		if (false/*part == 200*/) {
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
window.addEventListener( "load", start, false );
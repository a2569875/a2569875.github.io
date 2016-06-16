ManData.prototype = new DrawData();
ManData.prototype.constructor = ManData;
ManData.uber = DrawData.prototype;

function ManData(x, y, box) {
	this.x = x;
    this.y = y;
	this.box = box;
	this.obj = document.createElementNS(this.xmlns,'g');
	this.box.appendChild(this.obj);
	this.head = new CircleData(20,20,10,this.obj);
	this.body = new LineData(new Point(20,30),new Point(20,60),1,this.obj);
	this.hand = [new LineData(new Point(20,30),new Point(10,45),1,this.obj),new LineData(new Point(20,30),new Point(30,45),1,this.obj)];
	this.walking_func = null;
	
	this.leg = [
		new CurveData(new Point(20,60),new Point(10,75),new Point(17,65),new Point(13,71),this.obj),
		new CurveData(new Point(20,60),new Point(30,75),new Point(23,64),new Point(27,70),this.obj)
	];
	this.walk_flag = [
		[new Point(20,60),new Point(10,75),new Point(17,65),new Point(13,71)],
		[new Point(20,60),new Point(30,75),new Point(23,64),new Point(27,70)],
		[
			[new Point(15,80),new Point(20,85)],
			[new Point(0,70),new Point(20,70)],
			[new Point(15,72),new Point(20,80)],
		],

	];
	//new CurveData(new Point(10,50), new Point(50,50), new Point(20,20), new Point(15,50),document.getElementById("draw_frame"));
	/*
	test1.p1 = new Point(50,10);	//20 60
	test1.p2 = new Point(50,50);	//20 100
	test1.ctr1 = new Point(20,20);	//-10 70
	test1.ctr2 = new Point(50,15);	//20 65
	*/
	this.obj.appendChild(this.body.obj);
	this.obj.appendChild(this.head.obj);
	this.obj.appendChild(this.hand[0].obj);
	this.obj.appendChild(this.hand[1].obj);
	this.obj.appendChild(this.leg[0].obj);
	this.obj.appendChild(this.leg[1].obj);
}
ManData.prototype.getlocation = function () {
	return new Point(this.x, this.y);
}
ManData.prototype.stop_walk = function () {
	try{
		clearInterval(this.walking_func);
	}
	catch(ex){
		
	}
	this.walk_flag = [
		[new Point(20,60),new Point(10,75),new Point(17,65),new Point(13,71)],
		[new Point(20,60),new Point(30,75),new Point(23,64),new Point(27,70)],
		[
			[new Point(15,80),new Point(20,85)],
			[new Point(0,70),new Point(20,70)],
			[new Point(15,72),new Point(20,80)],
		],

	];
}
ManData.prototype.start_walk = function () {
	//第二端點
	var route3 = new Liner_Vector(new Point(15,80),new Point(20,85));
	//第一控制點
	var route = new Liner_Vector(new Point(0,70),new Point(20,70));
	//第二控制點
	var route2 = new Liner_Vector(new Point(15,72),new Point(20,80));
	
	//第二端點
	var route3_1 = new Liner_Vector(new Point(15,80),new Point(20,85));
	//第一控制點
	var route_1 = new Liner_Vector(new Point(0,70),new Point(20,70));
	//第二控制點
	var route2_1 = new Liner_Vector(new Point(15,72),new Point(20,80));
	
	this.leg[0].p1 = new Point(20,60);//20 60
	this.leg[0].p2 = new Point(20,100);//20 100
	this.leg[0].ctr1 = new Point(-10,70);//-10 70
	this.leg[0].ctr2 = new Point(20,65);//20 65
	
	this.leg[1].p1 = new Point(20,60);
	this.leg[1].p2 = new Point(20,100);
	this.leg[1].ctr1 = new Point(-10,70);
	this.leg[1].ctr2 = new Point(20,65);
	
	var part = 0;
	var part_1 = part+walk_speed_frame;
	var temp_man = this;
	this.walking_func = setInterval(frame, walk_speed);
	function frame() {
		if (false/*part == 200*/) {
			//clearInterval(id);
			//(walk_speed_frame*2)
		} else {
			part++;
			part_1 = part + walk_speed_frame;
			//p1,p2,ctr1,ctr2
			var tmp_pt = route.get_part((part%(walk_speed_frame*2))/walk_speed_frame);
			var temp_leg = part%(walk_speed_frame*2);
			if(temp_leg >= walk_speed_frame)temp_leg = (walk_speed_frame*2)-temp_leg;
			var tmp_pt3 = route3.get_part(temp_leg/walk_speed_frame);
			var tmp_pt2 = route2.get_part((part%(walk_speed_frame*2))/walk_speed_frame);
			if((part%(walk_speed_frame*2)) > walk_speed_frame){
				tmp_pt = route.get_part(((walk_speed_frame*2)-(part%(walk_speed_frame*2)))/walk_speed_frame);
				tmp_pt2 = route2.get_part(((walk_speed_frame*2)-(part%(walk_speed_frame*2)))/walk_speed_frame);
			}
			temp_man.walk_flag[0][1] = tmp_pt3;
			//temp_man.leg[0].p2 = tmp_pt3;
			
			temp_man.walk_flag[0][2] = tmp_pt;
			//temp_man.leg[0].ctr1 = tmp_pt;
			
			temp_man.walk_flag[0][3] = tmp_pt2;
			//temp_man.leg[0].ctr2 = tmp_pt2;
			temp_man.draw();
			
			tmp_pt = route_1.get_part((part_1%(walk_speed_frame*2))/walk_speed_frame);
			temp_leg = part_1%(walk_speed_frame*2);
			if(temp_leg >= walk_speed_frame)temp_leg = (walk_speed_frame*2)-temp_leg;
			tmp_pt3 = route3_1.get_part(temp_leg/walk_speed_frame);
			tmp_pt2 = route2_1.get_part((part_1%(walk_speed_frame*2))/walk_speed_frame);
			if((part_1%(walk_speed_frame*2)) > walk_speed_frame){
				tmp_pt = route_1.get_part(((walk_speed_frame*2)-(part_1%(walk_speed_frame*2)))/walk_speed_frame);
				tmp_pt2 = route2_1.get_part(((walk_speed_frame*2)-(part_1%(walk_speed_frame*2)))/walk_speed_frame);
			}
			temp_man.walk_flag[1][1] = tmp_pt3;
			//temp_man.leg[1].p2 = tmp_pt3;
			
			temp_man.walk_flag[1][2] = tmp_pt;
			//temp_man.leg[1].ctr1 = tmp_pt;
			
			temp_man.walk_flag[1][3] = tmp_pt2;
			//temp_man.leg[1].ctr2 = tmp_pt2;
			temp_man.draw();
		}
	}
}
ManData.prototype.draw = function () {
	this.head.x = 20 + this.x;
	this.head.y = 20 + this.y;
	
	this.body.p1 = (new Point(20,30)).add(this.getlocation());
	this.body.p2 = (new Point(20,60)).add(this.getlocation());
	this.hand[0].p1 = (new Point(20,30)).add(this.getlocation());
	this.hand[0].p2 = (new Point(10,45)).add(this.getlocation());
	this.hand[1].p1 = (new Point(20,30)).add(this.getlocation());
	this.hand[1].p2 = (new Point(30,45)).add(this.getlocation());
	
	
	for(var i=0; i<2; i++){
		this.leg[i].p1 = this.walk_flag[i][0].add(this.getlocation());
		this.leg[i].p2 = this.walk_flag[i][1].add(this.getlocation());
		this.leg[i].ctr1 = this.walk_flag[i][2].add(this.getlocation());
		this.leg[i].ctr2 = this.walk_flag[i][3].add(this.getlocation());
	}


	this.head.draw();
	this.body.draw();
	this.hand[0].draw();
	this.hand[1].draw();
	this.leg[0].draw();
	this.leg[1].draw();
}
ManData.prototype.show_message = function () {
	alert(this.x + ", " + this.y + ", r=" + this.r);
}
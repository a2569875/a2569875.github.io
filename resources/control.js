function playable_ani(cmd){
	this.cmd = cmd.split("\n");
}
var now_run;
playable_ani.prototype.execute = function () {
	document.getElementById("display_frame").innerHTML = "<svg id=\"draw_frame\" width=\"500px\" height=\"500px\"  viewBox=\"0 0 120 120\"></svg>";
	now_run = this;
	this.can_run = true;
	this.run_at = 0;
	this.program = setInterval( (function(self) {
         return function() {
			//alert(self.cmd.length);
            if(self.run_at > self.cmd.length) {
				clearInterval(self.program);
			}else{
				if(self.can_run){
					eval(self.cmd[self.run_at]);
					self.run_at++;
				}
			}
         }
     })(this), 10);
}
var is_output = false;
playable_ani.prototype.output = function () {
	document.getElementById("display_frame").innerHTML = "<svg id=\"draw_frame\" width=\"500px\" height=\"500px\"  viewBox=\"0 0 120 120\"></svg>";
	now_run = this;
	this.can_run = true;
	this.run_at = 0;
	start_gif_rander();
	this.program = setInterval( (function(self) {
         return function() {
			//alert(self.cmd.length);
            if(self.run_at > self.cmd.length) {
				clearInterval(self.program);
				stop_gif_rander();
				walk_speed = 10;
				walk_speed_frame = 100;
				is_output = false;
			}else{
				FrameChanged();
				if(self.can_run){
					eval(self.cmd[self.run_at]);
					self.run_at++;
				}
			}
         }
     })(this), 10);
}
function define_man(x, y){
	return new ManData(x,y,document.getElementById("draw_frame"));
}
function P(x, y){
	return new Point(x,y);
}
function define_basketball_man(x, y){
	var tmp_test = new AnimationData(basketball_fake, "STRING", 100, document.getElementById("draw_frame"));
	tmp_test.obj.setAttributeNS(null,"transform","translate(" + (10+ x) + "," + y +") scale(0.5)");
	return tmp_test;
}
function define_road(list){
	return new RouteData(list,0,document.getElementById("draw_frame"));
}
function ani_preview(){
	var code = new playable_ani(document.getElementById("wpTextbox1").value);
	code.execute();
}
function ani_2_gif(){
	var code = new playable_ani(document.getElementById("wpTextbox1").value);
	code.output();
}
function start_gif_rander(){
	walk_speed = 1;
	walk_speed_frame = 10;
	is_output = true;
	grander = new gencoder();
	grander.init(250, 250, 80);
}
function stop_gif_rander(){
	grander.get_gif();
}
function walk(man,road){

	//transform="scale(2,2) scale(-1,1)"
	//var route = new Liner_Vector(new Point(0,0),new Point(60,60));
	if(is_output){
		man.stop_walk();
		man.start_walk();
	}
	var part = 0;
	var id = setInterval(frame, 10);
	road.hide();

	function frame() {
		if (part == 100) {
			clearInterval(id);
			//road.draw();
			

			man.stop_walk();
			now_run.can_run = true;
		} else {
			part++;
			now_run.can_run = false;
			//var tmp_pt = route.get_part(part/100);
			var tmp_pt = road.get_path_at(part/100);
			man.x = tmp_pt.x - 20;
			man.y = tmp_pt.y - 20;
			man.draw();
			
		}
	}
}
var video;
var socket = io();
var vScale = 8;
function setup(){
  createCanvas(600,400);
  background(51);

  video = createCapture(VIDEO);
  video.size(width/vScale,height/vScale);
  pixelDensity(1);
  socket.on('broadcast',function(data){

  for (var y = 0; y<video.height ; ++y){
		for(var x = 0; x<video.width ; ++x){
			var index = (x+y*video.width);
			fill(color(data[index],data[index],data[index]));
			rect(x*vScale,y*vScale,vScale,vScale);
		}
	}
  });
}



function draw(){
	video.loadPixels();
	loadPixels();
	var data  = [];
	for (var y = 0; y<video.height ; ++y){
		for(var x = 0; x<video.width ; ++x){
			var index = (x+y*video.width)*4;
			var r = video.pixels[index+0];
			var g = video.pixels[index+1];
			var b = video.pixels[index+2];
			data.push((r+g+b)/3);
		}
	}
	socket.emit('chatVideo',data);

}


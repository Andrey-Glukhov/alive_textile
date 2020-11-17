var controller;
var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST= 7;
var stepSize = 1;
var diameter = 1;
//var direction;
var pointColor = []
var pointBlank = []
var countPoint = 10000;
var speed = 150;

var img;
//posX, posY;
function preload() {
  img = loadImage('http://localhost:8888/alive_textile/wordpress/wp-content/uploads/2020/11/start.png'); // Load the image
}


function setup() {
  var clientHeight = document.getElementById('opener_canvas').clientHeight;
  var clientWidth = document.getElementById('opener_canvas').clientWidth;

  var cnv = createCanvas(clientWidth, clientHeight);
  cnv.parent("opener_canvas");
  background(213, 197,179);
  image(img, 0, 0);
  smooth();
  noStroke();
  
  for (var ind = 0; ind < 3; ind++) {
    pointColor.push({posX: int(random(0, width)), posY: int(random(0, height))});
    pointBlank.push({posX: int(random(0, width)), posY: int(random(0, height))});
  }
}
function getPosition(pointArg) {
  var pointResult = {posX:pointArg.posX, posY:pointArg.posY};
  var direction = int(random(0, 8));

    if (direction == NORTH) {
      pointResult.posY -= stepSize;
    }
    else if (direction == NORTHEAST) {
      pointResult.posX += stepSize;
      pointResult.posY -= stepSize;
    }
    else if (direction == EAST) {
      pointResult.posX += stepSize;
    }
    else if (direction == SOUTHEAST) {
      pointResult.posX += stepSize;
      pointResult.posY += stepSize;
    }
    else if (direction == SOUTH) {
      pointResult.posY += stepSize;
    }
    else if (direction == SOUTHWEST) {
      pointResult.posX -= stepSize;
      pointResult.posY += stepSize;
    }
    else if (direction == WEST) {
      pointResult.posX -= stepSize;
    }
    else if (direction == NORTHWEST) {
      pointResult.posX -= stepSize;
      pointResult.posY -= stepSize;
    }

    if (pointResult.posX > width) pointResult.posX = 0;
    if (pointResult.posX < 0) pointResult.posX = width;
    if (pointResult.posY < 0) pointResult.posY = height;
    if (pointResult.posY > height) pointResult.posY = 0;
    return pointResult;
}
function draw() {
  for (var i=0; i<=speed; i++) {
	for (var ind = 0; ind < 3; ind++) {
		pointColor[ind] = getPosition(pointColor[ind]);
		fill(190, 255, 60, 70);
		ellipse(pointColor[ind].posX+stepSize/2, pointColor[ind].posY+stepSize/2, diameter, diameter);
	}
    if (countPoint <= 0) {
		for (var indBlank = 0; indBlank < 3; indBlank++) {
			pointBlank[indBlank] = getPosition(pointBlank[indBlank]);
			fill(213, 197, 179);
			ellipse(pointBlank[indBlank].posX+stepSize/2, pointBlank[indBlank].posY+stepSize/2, diameter, diameter);
		}
    } else {
      countPoint--;
    }

  }
}
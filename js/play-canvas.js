var aliveSketch = function(p) {
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
  var pointColor = []
  var pointBlank = []
  var countPoint = 10000;
  var speed = 150;

  var img;
  p.preload = function() {
  img = p.loadImage('http://localhost:8888/alive_textile/wordpress/wp-content/uploads/2020/11/start.png'); // Load the image
  }

  p.setup =function() {
    var clientHeight = document.getElementById('opener_canvas').clientHeight;
    var clientWidth = document.getElementById('opener_canvas').clientWidth;

    var cnv = p.createCanvas(clientWidth, clientHeight);
    cnv.parent("opener_canvas");
    p.background(213, 197,179);
    p.image(img, 0, 0);
    p.smooth();
    p.noStroke();

    for (var ind = 0; ind < 3; ind++) {
      pointColor.push({posX: p.int(p.random(0, p.width)), posY: p.int(p.random(0, p.height))});
      pointBlank.push({posX: p.int(p.random(0, p.width)), posY: p.int(p.random(0, p.height))});
    }
  }
  function getPosition(pointArg) {
    var pointResult = {posX:pointArg.posX, posY:pointArg.posY};
    var direction = p.int(p.random(0, 8));

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

      if (pointResult.posX > p.width) pointResult.posX = 0;
      if (pointResult.posX < 0) pointResult.posX = p.width;
      if (pointResult.posY < 0) pointResult.posY = p.height;
      if (pointResult.posY > p.height) pointResult.posY = 0;
      return pointResult;
  }
  p.draw = function() {
    for (var i=0; i<=speed; i++) {
    for (var ind = 0; ind < 3; ind++) {
      pointColor[ind] = getPosition(pointColor[ind]);
      p.fill(190, 255, 60, 70);
      p.ellipse(pointColor[ind].posX+stepSize/2, pointColor[ind].posY+stepSize/2, diameter, diameter);
    }
      if (countPoint <= 0) {
      for (var indBlank = 0; indBlank < 3; indBlank++) {
        pointBlank[indBlank] = getPosition(pointBlank[indBlank]);
        p.fill(213, 197, 179);
        p.ellipse(pointBlank[indBlank].posX+stepSize/2, pointBlank[indBlank].posY+stepSize/2, diameter, diameter);
      }
      } else {
        countPoint--;
      }

    }
  }
}

var myp5Object = new p5(aliveSketch);

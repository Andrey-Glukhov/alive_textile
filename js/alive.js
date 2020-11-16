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
var pointColor = []//{posX:0, posY:0};
var pointBlank = []//{posX:0, posY:0};
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
  // Displays the image at point (0, height/2) at half size
 // image(img, 0, height / 2, img.width / 2, img.height / 2);
  smooth();
  noStroke();
  // pointColor.posX = width/2;
  // pointColor.posY = height/2;
  // pointBlank.posX = width/2;
  // pointBlank.posY = height/2;
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

function pageTransition(){
  var tl = gsap.timeline();
  tl.to('.page_transition', {duration: 1.5, scaleX: 1, transformOrigin: "left"});
  tl.to('.page_transition', {duration: 1.5, scaleX: 0, delay: .1, transformOrigin: "right"});
};
function contentAnimation(){
  var tl = gsap.timeline();
  tl.from('h2', {duration: 1.5, translateY: 50, opacity: 0})
};

function page_delay(n){
  n = n || 2000;
  return new Promise(done => {
    setTimeout(()=>{
      done();
    }, n);
  });
};

barba.init({
  sync: true,
  transitions: [{
    name: 'page_transition',
    async leave(data) {
    const done = this.async();
    pageTransition();
    await page_delay(3000);
    done();
    },
    async enter(data) {
      contentAnimation();
    },
    async once(data) {
      contentAnimation();
    }
  }]
});

$(document).ready(function () {

  $('.menu-btn').on('click', function () {
    if ($('.animated-icon1').hasClass('open')) {
      $('.animated-icon1').removeClass('open');
      $('.menu').removeClass('active');
    }else{
      $('.animated-icon1').addClass('open');
      $('.menu').addClass('active');
    };
  });

  if ($('.timeline').length) {
   
     controller = new ScrollMagic.Controller();
     gsap.defaultOverwrite = false;
     var tweenSet = gsap.fromTo('.menu_sticker', {top:'-150%'}, {top:0, duration: 0.5} );
     var scene = new ScrollMagic.Scene({
        triggerElement: ".timeline",
        triggerHook: 0.4})
          .setTween(tweenSet)
					.addIndicators() // add indicators (requires plugin)
          .addTo(controller);
     $('.r_d').each(function() {
      
      $(this).click(function() {
        $('.collapse').collapse('hide');
        $(this).parent().siblings('.collapse').collapse('show');
      });
     });
     setTimeout(setBack, 3300);
  }
  
});

function setBack () {
  $('.alive_opener').css('background-color','inherit'); 
}
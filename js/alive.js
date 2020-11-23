
var myp5Object ;

function pageTransition(){
  var tl = gsap.timeline();
  tl.to('.page_transition', {duration:1.5, scaleX: 1, transformOrigin: "left"});
  //tl.to('.page_transition', {duration: .5, scaleX: 0, delay: .1, transformOrigin: "right"});
};
function contentAnimation(){
  var tl = gsap.timeline();
  //tl.from('h2', {duration: 1.5, translateY: 50, opacity: 0})
  tl.to('.page_transition', {duration: 1.5, scaleX: 0, delay: .1, transformOrigin: "right"});
};

function page_delay(n){
  n = n || 2000;
  return new Promise(done => {
    setTimeout(()=>{
     //done();
    }, n);
  });
};

barba.init({
  //debug: true,
  //logLevel: 'debug',
  transitions: [{
    name: 'page_transition',
    sync: true,
     leave(data) {
    const done = this.async();
    pageTransition();
    setTimeout(function() {
       done();
     }, 1600);
    },
     after(data) {

      const done = this.async();
      contentAnimation();
     setTimeout(function() {
       done();
     }, 1600);
    initScipt();
    initP5();

    }//,
    //  once(data) {
    //   contentAnimation();
    // }
  }]
});
function initScipt() {
  
console.log('init');
  if ($('.timeline').length) {
    
    // ScrollMagic setup
     controller = new ScrollMagic.Controller();
     gsap.defaultOverwrite = false;
     var tweenSet = gsap.fromTo('.menu_sticker', {top:'-150%'}, {top:0, duration: 0.5} );
     var scene = new ScrollMagic.Scene({
        triggerElement: ".timeline",
        triggerHook: 0.4})
          .setTween(tweenSet)
					//.addIndicators() // add indicators (requires plugin)
          .addTo(controller);
      // collapse elements
      $('.r_d').each(function() {
      $(this).click(function(evt) {
        $('.collapse').collapse('hide');
        var circle = evt.target;
        $(circle).parent().siblings('.collapse').collapse('show');
        $(circle).parent().siblings('.collapse').children('.column_event');
       });
     });
    
     // Timelene tooltip
    var tooltipElem;
    document.onmouseover = function(event) {
      var target = event.target;
      var tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;
      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip_r_d';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);
      var coords = target.getBoundingClientRect();
      var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;
      var top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
      }
      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function(e) {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    };
    $(window).resize(function() {
      initP5()
    });
    // Categories 
    var scene_cat = new ScrollMagic.Scene({
      triggerElement: ".timeline",
      triggerHook: 0.3})
        .setTween(gsap.fromTo('.evet_category', {left:'-150px'}, {left: "15px", duration: 0.5} ))
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    $('.category_column').children().click(function() {
      if  ($(this).data('press') ==='yes') {
        $(this).data('press', 'no');
        $(this).css('background-position', 'top');
      } else {
        $(this).data('press', 'yes');  
        $(this).css('background-position', 'bottom');
      }      
      var catArray = [];
      $('.category_column').children().each(function() {
        if ($(this).data('press') ==='yes') {
          catArray.push( $(this).data('category'));
        }
      });
      $('.timeline_item').each(function() {
        if (catArray.length <= 0) { 
          $(this).removeClass('item_hide');
        } else {
          if (catArray.indexOf($(this).data('category')) >= 0) {
            $(this).removeClass('item_hide');
          } else {
            $(this).addClass('item_hide');
          }
        }
      });
    });
    setTimeout(setBack, 3300); // unset background alive_opener 
  }

}
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
  initScipt();
  initP5();
});

function setBack () {
  $('.alive_opener').css('background-color','inherit');
}
function initP5() {
  if ($('.timeline').length) {
    if (window.myp5Object !== undefined && window.aliveSketch !== undefined) {
      delete  window.myp5Object;

    }
    window.myp5Object = new p5(aliveSketch);
  } else {
    delete  window.myp5Object;
  }

}

var aliveSketch = function(p) {
  var controller;
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
    var directionsArray = [
      [0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]
    ];
    var direction = p.int(p.random(0, 8));

      pointResult.posX += directionsArray[direction][0] * stepSize;
      pointResult.posY += directionsArray[direction][1] * stepSize;
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

//var myp5Object = new p5(aliveSketch);

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
  transitions: [{
    name: 'page_transition',
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

    },
     once(data) {
      contentAnimation();
    }
  }]
});
function initScipt() {
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
        // var collapseHeight = $(circle).parent().siblings('.collapsing').children('.column_event').height();
        // var collapseWidth = $(circle).parent().siblings('.collapsing').children('.column_event').width();
        // console.log('---' + collapseHeight + '--- ' + collapseWidth);
        // console.log($(circle).parent().siblings());
        // var cnvasObj = document.querySelector('#opener_canvas canvas');
        // var dataURL = cnvasObj.toDataURL('image/jpg', 0.2,{left: 0, top: 0, width: collapseWidth, height: collapseHeight}); // ,{left: 0, top: 0, width: collapseWidth, height: collapseHeight}
        // console.log(dataURL);
        // var imageElement = $(circle).parent().siblings('.collapsing').find('img')[0];
        // imageElement.src = dataURL;
      });
     });
     setTimeout(setBack, 3300); // unset background alive_opener 
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
    $('.category_column').children().click(function() {
      console.log(this);
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
      console.log(catArray);
      $('.timeline_item').each(function() {
        console.log($(this));
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
  }

}
$(document).ready(function () {
  initScipt();

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

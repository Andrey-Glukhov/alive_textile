var controller;
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
     var scene = new ScrollMagic.Scene({
        triggerElement: ".timeline",
        triggerHook: 0.1})
          .setTween(".menu_sticker", 0.5, {top:0})
					.addIndicators() // add indicators (requires plugin)
          .addTo(controller);
          
  }
});

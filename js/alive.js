var controller;
barba.init({
    // ...
  })

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
      scene = new ScrollMagic.Scene({
        triggerElement: $(this)[0],
        triggerHook: 0.3,
        duration: '50px'})
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
        scene.on("start", function (event) {
          if (event.scrollDirection !=="FORWARD") {
            return;
          }
          $(this.triggerElement()).parent().siblings('.collapse').collapse('show');
          console.log("Hit start point of scene.");
        });
        scene.on("leave", function (event) {
          $(this.triggerElement()).parent().siblings('.collapse').collapse('hide');
        //console.log("Hit leave point of scene." + event.scrollDirection);

      });
      $(this).click(function() {
        controller.scrollTo($(this)[0]);
      });
     });

  }
});

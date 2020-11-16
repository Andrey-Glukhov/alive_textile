var controller;
function pageTransition(){
  var tl = gsap.timeline();
  tl.to('.page_transition', {duration: .5, scaleY: 1})
  tl.to('.page_transition', {duration: .5, scaleY: 0, delay: .1})
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
    await page_delay(1500);
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
      // scene = new ScrollMagic.Scene({
      //   triggerElement: $(this)[0],
      //   triggerHook: 0.3,
      //   duration: '50px'})
      //   .addIndicators() // add indicators (requires plugin)
      //   .addTo(controller);
      //   scene.on("start", function (event) {
      //     console.log("Hit start point of scene." + event.scrollDirection);
      //     if (event.scrollDirection !=="FORWARD") {
      //       return;
      //     }
      //     $('.collapse').collapse('hide');
      //     $(this.triggerElement()).parent().siblings('.collapse').collapse('show');

      //   });
      //   scene.on("leave", function (event) {
      //     $(this.triggerElement()).parent().siblings('.collapse').collapse('hide');
      //   //console.log("Hit leave point of scene." + event.scrollDirection);

      // });
      $(this).click(function() {
        //controller.scrollTo($(this)[0]);
        $('.collapse').collapse('hide');
        $(this).parent().siblings('.collapse').collapse('show');
        // if ($(this).parent().hasClass('circule')){
        //   $('.collapse').collapse('hide');
        //   $(this).parent().removeClass('circule');
        //   $(this).parent().siblings('.collapse').collapse('show');
        //
        // }else{
        //   $('.r_d').parent().addClass('circule');
        //   $(this).parent().siblings('.collapse').collapse('hide');
        // };
      });
     });

  }
});

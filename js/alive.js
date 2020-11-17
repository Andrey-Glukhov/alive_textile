
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
  debug: true,
  logLevel: 'debug',
  //sync: true,
  transitions: [{
    name: 'page_transition',
     leave(data) {
    const done = this.async();
    pageTransition();
    // data.current.container.style.display = 'none';
     setTimeout(function() {
       done();
     }, 1600);
    //await page_delay(3000);
    //done();
    },
     after(data) {
      const done = this.async();
      contentAnimation();
     setTimeout(function() {
       done();
     }, 1600);
    },
     once(data) {
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

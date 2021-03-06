var myp5Object;

var pointColor = [];
var pointBlank = [];
var drawTimer;
var countPoint = 10000;
var speed = 250;
var stepSize = 1;
var diameter = 1;
var canvasType;
var colorLight = 'rgba(196, 255, 0, 0.27)';
var colorDark = 'rgb(213, 197, 179)';

var preventMouseOver = false; // prevent hover on moble
var preventMenuOver = false; // prevent hover on desktop menu
var pastWidth;
var resizeTimer;

function pageTransition() {
    var tl = gsap.timeline();
    tl.to('.page_transition', { duration: 1.5, scaleX: 1, transformOrigin: "left" });
};

function contentAnimation() {
    var tl = gsap.timeline();
    tl.to('.page_transition', { duration: 1.5, scaleX: 0, delay: .1, transformOrigin: "right" });
};

function page_delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {}, n);
    });
};
// init page transitions
barba.init({
    transitions: [{
        name: 'page_transition',
        sync: true,
        leave(data) {
            clearInterval(drawTimer);
            const done = this.async();
            pageTransition();
            setTimeout(function() {
                done();
            }, 1600);
            //done();
        },
        enter(data) {
            window.scrollTo(0, 0);
            if ($('.menu').hasClass('active')) {
                $('.menu').removeClass('active');
                $('.animated-icon1').removeClass('open');
            }
        },
        after(data) {
            const done = this.async();
            contentAnimation();
            setTimeout(function() {
                done();
            }, 1600);
            initScipt();
            setupPattern();
            setLogos();
            var scrollElement = document.querySelector('.timeline');
            if (scrollElement) {
                scrollElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }]
});

// init scripts for pages 
function initScipt() {
    if ($('.timeline').length) { //home page

        // ScrollMagic setup
        controller = new ScrollMagic.Controller();
        gsap.defaultOverwrite = false;
        var tweenSet = gsap.fromTo('.menu_sticker', { top: '-150%' }, { top: 0, duration: 0.5 });
        var sceneOffset = document.getElementById('opener_canvas').clientHeight / 2;
        new ScrollMagic.Scene({
                triggerElement: ".timeline",
                triggerHook: 0.05
            })
            .on("start", function(event) {
                if (event.scrollDirection === "FORWARD") {
                    $('.alive_opener').addClass('freezed');
                } else {
                    $('.alive_opener').removeClass('freezed');
                }
            })
            .addTo(controller);

        new ScrollMagic.Scene({
                triggerElement: ".timeline",
                triggerHook: 0.1
            })
            .setTween(tweenSet)
            .addTo(controller);

        // collapse elements
        $('.r_d').each(function() {
            $(this).mouseover(function(evt) {
                var circle = evt.target;
                if ($(circle).attr('data-open') == 'open') {
                    return
                }
                var catName = 'overlay_icon_' + $(circle).parent().parent().attr('data-category');
                if (!$(circle).hasClass(catName)) {
                    gsap.to($(circle).addClass(catName), 0.3, { scale: 3 });
                };
            });
            $(this).mouseout(function(evt) {
                var circle = evt.target;
                if ($(circle).attr('data-open') == 'open') {
                    return
                }
                var catName = 'overlay_icon_' + $(circle).parent().parent().attr('data-category');
                gsap.to($(circle).removeClass(catName), 0.3, { scale: 1 });
            });
            $(this).click(function(evt) {
                var circle = evt.target;
                var catName = 'overlay_icon_' + $(circle).parent().parent().attr('data-category');
                if ($(circle).hasClass(catName)) {
                    $(circle).css('background-position', 'bottom');
                }
                if ($(circle).parent().siblings('.collapse').hasClass('show')) {
                    $(circle).attr('data-open', 'close');
                    $(circle).parent().siblings('.collapse').collapse('hide');
                    $(circle).css('background-position', 'top');
                    gsap.to($(circle).removeClass(catName), 0.3, { scale: 1 });
                } else {
                    gsap.to($(circle).addClass(catName), 0.3, { scale: 3 });
                    $(circle).attr('data-open', 'open');
                    $(circle).parent().siblings('.collapse').collapse('show');
                }
            });
        });

        // Timelene tooltip
        var tooltipElem;
        document.onmouseover = function(event) {
            if (preventMouseOver) {
                preventMouseOver = false;
                return;
            }
            var target = event.target;
            var tooltipHtml = target.dataset.tooltip;
            if (!tooltipHtml) return;
            if ($(target).attr('data-open') == 'open') {
                return;
            }
            tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip_r_d';
            tooltipElem.innerHTML = tooltipHtml;
            document.body.append(tooltipElem);
            var coords = target.getBoundingClientRect();
            if ($(target).parent().siblings('.row').children('.column_ongoing').children().length) {
                var left = coords.left + (target.offsetWidth) / 2 - tooltipElem.offsetWidth - 20; //- tooltipElem.offsetWidth) / 2;
            } else {
                var left = coords.left + (target.offsetWidth) / 2 + 20;
            }
            var top = coords.top + target.offsetHeight / 2 - tooltipElem.offsetHeight / 2;
            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';
        };

        document.onmouseout = function(e) {
            if (tooltipElem) {
                tooltipElem.remove();
                tooltipElem = null;
            }
        };


        $('.category_column').children('.icon_wraper').children('.filter').click(function() {
            if ($(this).attr('data-press') === 'yes') {
                $(this).attr('data-press', 'no');
                $(this).css('background-position', 'top');
            } else {
                $(this).attr('data-press', 'yes');
                $(this).css('background-position', 'bottom');
            }
            //filter categories on timeline
            var catArray = [];
            $('.category_column').children('.icon_wraper').children('.filter').each(function() {
                if ($(this).attr('data-press') === 'yes') {
                    catArray.push($(this).attr('data-category'));
                }
            });
            $('.timeline_item').each(function() {
                if (catArray.length <= 0) {
                    $(this).removeClass('item_hide');
                } else {
                    if (catArray.indexOf($(this).attr('data-category')) >= 0) {
                        $(this).removeClass('item_hide');
                    } else {
                        $(this).addClass('item_hide');
                    }
                }
            });
        });
        $('.category_column').children('.icon_wraper').children('.filter').on('mouseover', function() {
            if (preventMouseOver) {
                preventMouseOver = false;
                return;
            }
            gsap.to($(this).siblings('.tiptext')[0], { opacity: 1 });

        });
        $('.category_column').children('.icon_wraper').children('.filter').on('mouseout', function() {
            if (preventMouseOver) {
                preventMouseOver = false;
                return;
            }
            gsap.to($(this).siblings('.tiptext')[0], { opacity: 0 });
        });
        var timelineElement = document.querySelector('.timeline');
        if (timelineElement) {
            $('.arrow_to_scroll').on('click', function() {
                timelineElement.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }
    if ($('.for_animation').length) {
        controller = new ScrollMagic.Controller();
        $('.for_animation').each(function() {
            var ourScene = new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.8
                })
                .setClassToggle($(this)[0], 'animated')
                .addTo(controller);
        });
    }
    if ($('.people-background').length) { //team page
        $('.portret a').click(function() {
            $('.profile').collapse('hide');
            $('.profile').each(function() {
                if ($(this).parents('.portret_row').length) {
                    $(this).parents('.container-fluid').append($(this));
                }
            });
            var idProfile = $(this).attr('href');
            var destination = $(this).parent();
            var currentOffset = destination[0].offsetTop;
            var first = true;
            $(this).parents('.portret_row').children('.portret').each(function() {
                if (first && this.offsetTop > currentOffset) {
                    destination = $(this);
                    first = false;
                } else {

                }
            });
            var source = $(idProfile);
            var container = $(this).parents('.portret_row');
            if (first) {
                container.append(source);
            } else {
                destination.before(source);
            }

            var select = $(this).attr('href');
            $(select).collapse('show');
        });

    }
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if ($(window).width() != pastWidth) {
                var canvas = document.getElementById('patternlayer');
                if (canvas) {
                    canvas.parentNode.removeChild(canvas);
                    setupPattern();
                }
                setLogos();
                pastWidth = $(window).width();
            }
        }, 100);

    });
    $("*").on("touchend", function(e) { preventMouseOver = true; });
}

function setLogos() {
    var narrow = false;
    if (document.documentElement.clientWidth <= 576) {
        narrow = true;
    }
    $('.logo_image img').each(function() {

        $(this).css('left', 5 + '%');
        var destCircle = $(this).parent().siblings('.team_dot').first();
        if (narrow) {
            $(this).parent().parent().css('padding', '10px');
            $(this).css('position', 'relative');
            $(this).css('top', '50%');
            $(this).css('transform', 'none');
            destCircle.css('top', '50%');
            destCircle.css('right', '0px');
        } else {
            var destBlock = $(this).parents('.organization_row').find('.portret a img').first();
            if (!destBlock.length) {
                destBlock = $(this).parents('.organization_row').find('.portret').first();
            }
            var destHeight = destBlock.height();
            var destOffset = destHeight / 2 - $(this).height() / 2;
            $(this).css('position', 'absolute');
            $(this).css('top', destOffset + 'px');
            $(this).css('transform ', 'none')
            destOffset = destHeight / 2;
            destCircle.css('top', destOffset + 'px');
            destCircle.css('right', '-8px');
        }
    });
}

$(window).on('load', setLogos);

$(document).ready(function() {

    // $('.menu-btn').on('click', function() {
    //     if ($('.animated-icon1').hasClass('open')) {
    //         $('.animated-icon1').removeClass('open');
    //         $('.menu').removeClass('active');
    //     } else {
    //         $('.animated-icon1').addClass('open');
    //         $('.menu').addClass('active');
    //     }
    // });

    // init menu events 
    function hasTouch() {
        return 'ontouchstart' in document.documentElement ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }
    if (hasTouch()) {
        $('.menu-btn').on('click', function(e) {
            e.stopPropagation();
            if ($('.animated-icon1').hasClass('open')) {
                $('.animated-icon1').removeClass('open');
                $('.menu').removeClass('active');
            } else {
                $('.animated-icon1').addClass('open');
                $('.menu').addClass('active');
            }
        });
    } else {
        $('.menu-btn').on('mouseover', function() {
            if (preventMenuOver) {
                // preventMouseOver = false;
                return;
            }
            $('.animated-icon1').addClass('open');
            $('.menu').addClass('active');
            preventMenuOver = true;

        });
    }
    $('body').on('click', function(e) {

        if ($('.animated-icon1').hasClass('open')) {
            $('.animated-icon1').removeClass('open');
            $('.menu').removeClass('active');
            $('.menu-btn').css('display', 'block');
            preventMenuOver = true;
            setTimeout(function() {
                preventMenuOver = false;
            }, 1500);
        }
    });
    initScipt();
    setupPattern();
    pastWidth = $(window).width();
});

// get element for canvas
function getCanvasWrapper() {
    var canvasWrapper = document.querySelector('.alive_opener');
    if (canvasWrapper) {
        canvasType = 'alive';
        return canvasWrapper;
    }
    canvasWrapper = document.querySelector('.single_opener');
    var ongoingTags = document.querySelector('.single_ongoing_type');
    if (canvasWrapper && ongoingTags) {
        canvasType = 'ongoing';
        return canvasWrapper;
    } else if (canvasWrapper) {
        canvasType = 'single';
        return canvasWrapper;
    }
    canvasWrapper = document.querySelector('.static_opener');
    if (canvasWrapper) {
        canvasWrapper.style.width = document.querySelector('.canvas_template').clientWidth + 'px';
        canvasWrapper.style.left = document.querySelector('.canvas_template').offsetLeft + 'px';
        canvasType = 'static';
        return canvasWrapper;
    }
    return null;
}
// init pattern o the page
function setupPattern() {

    var canvasWrap = getCanvasWrapper();
    if (!canvasWrap) {
        return;
    }
    var clientHeight = canvasWrap.offsetHeight; //clientHeight;
    var clientWidth = canvasWrap.offsetWidth; //clientWidth;
    var canvasElement = document.createElement('canvas');
    canvasElement.id = "patternlayer";
    canvasElement.width = clientWidth;
    canvasElement.height = clientHeight;
    canvasWrap.appendChild(canvasElement);
    var ctx = canvasElement.getContext('2d');
    pointColor = [];
    pointBlank = [];
    for (var ind = 0; ind < 3; ind++) {
        pointColor.push({
            posX: randomInt(0, clientWidth),
            posY: randomInt(0, clientHeight)
        });
        pointBlank.push({
            posX: randomInt(0, clientWidth),
            posY: randomInt(0, clientHeight)
        });
    }
    if (canvasType !== 'alive') {
        drawTimer = setInterval(drawPattern, 150);
        return;
    }
    var img1 = new Image();
    img1.onload = function() {
        ctx.drawImage(img1, 0, 0);
        drawTimer = setInterval(drawPattern, 150);
    };
    img1.src = 'https://www.alivetextiles.com/wp-content/themes/alive/img/start.png';
}
// DRAW
function drawPattern() {
    var canvasWrap = getCanvasWrapper();
    if (!canvasWrap) {
        return;
    }
    var clientHeight = canvasWrap.clientHeight;
    var clientWidth = canvasWrap.clientWidth;
    var canvasElement = document.querySelector('#patternlayer')
    var ctx = canvasElement.getContext('2d');
    if (canvasType === 'ongoing' || canvasType === 'static') {
        ctx.fillStyle = colorDark;
        ctx.shadowColor = colorLight;
    } else if (canvasType === 'single') {
        ctx.fillStyle = colorLight;
        ctx.shadowColor = colorLight;
    }
    for (var i = 0; i <= speed; i++) {
        for (var ind = 0; ind < 3; ind++) {
            pointColor[ind] = getPosition(pointColor[ind], stepSize, clientWidth, clientHeight);
            if (canvasType === 'alive') {
                if (pointColor[ind].posX + stepSize / 2 < clientWidth / 2 && pointColor[ind].posY + stepSize / 2 > clientHeight / 2) {
                    ctx.fillStyle = colorDark;
                    ctx.shadowColor = colorLight;
                } else {
                    ctx.fillStyle = colorLight;
                    ctx.shadowColor = colorLight;
                }
            }
            ctx.shadowBlur = 1;
            ctx.fillRect(pointColor[ind].posX + stepSize / 2, pointColor[ind].posY + stepSize / 2, diameter, diameter);
            ctx.shadowBlur = 0;
        }
        if (countPoint <= 0) {
            for (var indBlank = 0; indBlank < 3; indBlank++) {
                pointBlank[indBlank] = getPosition(pointBlank[indBlank], stepSize, clientWidth, clientHeight);
                ctx.clearRect(pointBlank[indBlank].posX + stepSize / 2, pointBlank[indBlank].posY + stepSize / 2, diameter, diameter);
            }
        } else {
            countPoint--;
        }

    }
}
// get the position to draw next element
function getPosition(pointArg, stepSize, pWidth, pHeight) {
    var pointResult = { posX: pointArg.posX, posY: pointArg.posY };
    var directionsArray = [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1]
    ];
    var direction = Math.floor(Math.random() * 8);
    pointResult.posX += directionsArray[direction][0] * stepSize;
    pointResult.posY += directionsArray[direction][1] * stepSize;
    if (pointResult.posX > pWidth) pointResult.posX = 0;
    if (pointResult.posX < 0) pointResult.posX = pWidth;
    if (pointResult.posY < 0) pointResult.posY = pHeight;
    if (pointResult.posY > pHeight) pointResult.posY = 0;
    return pointResult;
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}
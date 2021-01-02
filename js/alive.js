var myp5Object;

var pointColor = [];
var pointBlank = [];
var drawTimer;
var countPoint = 10000;
var speed = 250;
var stepSize = 1;
var diameter = 1;


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

barba.init({
    transitions: [{
        name: 'page_transition',
        sync: true,
        leave(data) {
            const done = this.async();
            pageTransition();
            setTimeout(function() {
                done();
            }, 1600);
            clearInterval(drawTimer);
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
            //initP5();

        } //,
        //  once(data) {
        //   contentAnimation();
        // }
    }]
});

function initScipt() {
    if ($('.timeline').length) {

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
                if ($(this).data('open') == 'open') {
                    return
                }
                var catName = 'overlay_icon_' + $(this).parent().parent().data('category');
                if (!$(this).hasClass(catName)) {
                    gsap.to($(this).addClass(catName), 0.3, { scale: 3 });
                };
            });
            $(this).mouseout(function(evt) {
                if ($(this).data('open') == 'open') {
                    return
                }
                var catName = 'overlay_icon_' + $(this).parent().parent().data('category');
                gsap.to($(this).removeClass(catName), 0.3, { scale: 1 });
            });
            $(this).click(function(evt) {
                var circle = evt.target;
                var catName = 'overlay_icon_' + $(this).parent().parent().data('category');
                if ($(this).hasClass(catName)) {
                    $(this).css('background-position', 'bottom');
                }
                if ($(this).parent().siblings('.collapse').hasClass('show')) {
                    $(this).data('open', 'close');
                    $(this).parent().siblings('.collapse').collapse('hide');
                    $(this).css('background-position', 'top');
                } else {
                    $(this).data('open', 'open');
                    $(this).parent().siblings('.collapse').collapse('show');
                }
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
        $(window).resize(function() {
            var canvas = document.getElementById('patternlayer');
            if (!canvas) {
                return;
            }
            canvas.parentNode.removeChild(canvas);
            setupPattern();
            //  initP5()
        });

        $('.category_column').children('.icon_wraper').children('.filter').click(function() {
            if ($(this).data('press') === 'yes') {
                $(this).data('press', 'no');
                $(this).css('background-position', 'top');
            } else {
                $(this).data('press', 'yes');
                $(this).css('background-position', 'bottom');
            }
            var catArray = [];
            $('.category_column').children('.icon_wraper').children('.filter').each(function() {
                if ($(this).data('press') === 'yes') {
                    catArray.push($(this).data('category'));
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
        //setTimeout(setBack, 3300); // unset background alive_opener
    }

    if ($('.people-background').length) {
        $('.portret a').click(function() {
            var select = $(this).attr('href');
            //console.log(select);
            $('.profile').collapse('hide');
            $(select).collapse('show');
        });
    }
}

$(document).ready(function() {
    $('.menu-btn').on('click', function() {
        if ($('.animated-icon1').hasClass('open')) {
            $('.animated-icon1').removeClass('open');
            $('.menu').removeClass('active');
        } else {
            $('.animated-icon1').addClass('open');
            $('.menu').addClass('active');
        };
    });
    initScipt();
    setupPattern();
    //initP5();
});

// function setBack() {
//     //$('.alive_opener').css('background-color','inherit');
//     gsap.to('.alive_opener', 1.5, { backgroundColor: 'rgba(213, 197, 179,0)' });
// }


function setupPattern() {
    var single = false;
    var canvasWrapper = document.querySelector('.alive_opener');
    if (!canvasWrapper) {
        canvasWrapper = document.querySelector('.single_opener');
        var single = true;
    }
    if (!canvasWrapper) {
        return;
    }
    var clientHeight = canvasWrapper.clientHeight;
    var clientWidth = canvasWrapper.clientWidth;
    var canvasElement = document.createElement('canvas');
    canvasElement.id = "patternlayer";
    canvasElement.width = clientWidth;
    canvasElement.height = clientHeight;
    canvasWrapper.appendChild(canvasElement);
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
    if (single) {
        // if (!drawTimer) {
        drawTimer = setInterval(drawPattern, 150);
        //}
        return;
    }
    var img1 = new Image();
    img1.onload = function() {
        //console.log(img1.naturalWidth + '===' + img1.naturalHeight + clientWidth + '---' + clientHeight);
        //ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight, 0, 0, clientWidth, clientHeight);
        ctx.drawImage(img1, 0, 0);
        //if (!drawTimer) {
        drawTimer = setInterval(drawPattern, 150);
        //}

    };
    img1.src = 'http://localhost:8888/alive_textile/wordpress/wp-content/uploads/2020/11/start.png';
}
//setupPattern();


function drawPattern() {
    //console.log('--' + clientHeight + '-- ' + clientWidth);
    var canvasWrapper = document.querySelector('.alive_opener');
    var canvasElement = document.querySelector('.alive_opener canvas');
    var ongoingTags = document.querySelectorAll('.single_ongoing_type');
    var single = false;
    if (!canvasWrapper) {
        canvasWrapper = document.querySelector('.single_opener');
        canvasElement = document.querySelector('.single_opener canvas');
        single = true;
    }
    if (!canvasWrapper) {
        return;
    }
    var clientHeight = canvasWrapper.clientHeight;
    var clientWidth = canvasWrapper.clientWidth;
    var ctx = canvasElement.getContext('2d');
    if (single) {
        if (ongoingTags.length) {
            ctx.fillStyle = 'rgb(213, 197, 179)';
        } else {
            ctx.fillStyle = 'rgba(190, 255, 60, 0.27)';
        }
    } else {
        ctx.fillStyle = 'rgba(190, 255, 60, 0.27)';
    }
    for (var i = 0; i <= speed; i++) {
        for (var ind = 0; ind < 3; ind++) {
            pointColor[ind] = getPosition(pointColor[ind], stepSize, clientWidth, clientHeight);
            if (!single) {
                if (pointColor[ind].posX + stepSize / 2 < clientWidth / 2 && pointColor[ind].posY + stepSize / 2 > clientHeight / 2) {
                    ctx.fillStyle = 'rgb(213, 197, 179)';
                } else {
                    ctx.fillStyle = 'rgba(190, 255, 60, 0.27)';
                }
            }
            ctx.fillRect(pointColor[ind].posX + stepSize / 2, pointColor[ind].posY + stepSize / 2, diameter, diameter);
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

//var myp5Object = new p5(aliveSketch);
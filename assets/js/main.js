
var $ = jQuery.noConflict();

(function($) {
  'use strict';

/*==============================================================================
variable
==============================================================================*/
var $html = $('html');
var $body = $('body');

/*==============================================================================
ie10 viewport fix
==============================================================================*/
  (function() {
    'use strict';
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    }
  })();

/*==============================================================================
device detect
==============================================================================*/
  if ($html.hasClass('desktop')) {
    $html.addClass('non-mobile');
    var isMobile = false;
  } else {
    $html.addClass('is-mobile');
    var isMobile = true;
  }
  if ($html.hasClass('ie9')) {
    var isIE9 = true;
  }

/*==============================================================================
site loader
==============================================================================*/
  function fn_siteLoader() {
    $('#home .section-subtitle, #home .section-title span').lettering('words').children('span').lettering();
    $('.char, .col-countdown, .section-divider').css('opacity', 0);
    $('.word').css('display', 'inline-block');

    var delay = _siteLoaderDelay + _siteLoaderDuration - 400
    var easing = [0.710, 0.100, 0.3, 1.000];
    var titleCount = $('.section-title .char').length;
    var subtitleCount = $('.section-subtitle .char').length;
    var countdownCount = $('.countdown-section').length;
    var stagger1 = _animationDuration/titleCount;
    var stagger2 = _animationDuration/subtitleCount;
    var stagger3 = _animationDuration;

    /* Registration */
    $.Velocity
      .RegisterEffect('transition.bfcSlideDownIn_60', {
        defaultDuration: 800,
        calls: [
          [ { translateZ: 0, translateY: [0, '60px'], opacity: [ 1, 0 ] } ]
        ]
      })
      .RegisterEffect('transition.bfcSlideUpIn_-60', {
        defaultDuration: 800,
        calls: [
          [ { translateZ: 0, translateY: [0, '-60px'], opacity: [ 1, 0 ] } ]
        ]
      })
      .RegisterEffect('transition.bfcSlideUpIn_15', {
        defaultDuration: 800,
        calls: [
          [ { translateZ: 0, translateY: [0, '15px'], opacity: [ 1, 0 ] } ]
        ]
      })
      .RegisterEffect('transition.bfcSlideDownIn_-15', {
        defaultDuration: 800,
        calls: [
          [ { translateZ: 0, translateY: [0, '-15px'], opacity: [ 1, 0 ] } ]
        ]
      });

    var $siteLoader = $('#site-loader');

    $(window).on('load', function() {
      $siteLoader.velocity({
        translateZ: 0,
        translateY: '-100%'
      }, {
        delay: _siteLoaderDelay,
        duration: _siteLoaderDuration,
        easing: easing,
        complete: function() {
          $(this).remove();
        }
      });

      $('#site-wrap').velocity({
        translateZ: 0,
        translateY: [0, '70%']
      }, {
        delay: _siteLoaderDelay,
        duration: _siteLoaderDuration,
        easing: easing
      });

      $('#home .section-title .char:nth-child(odd)').velocity('transition.bfcSlideDownIn_60', {
        display: 'inline-block',
        stagger: stagger1,
        easing: easing,
        delay: delay
      });
      $('#home .section-title .char:nth-child(even)').velocity('transition.bfcSlideUpIn_-60', {
        display: 'inline-block',
        stagger: stagger1,
        easing: easing,
        delay: delay
      });

      $('#home .section-subtitle .char:nth-child(odd)').velocity('transition.bfcSlideUpIn_15', {
        display: 'inline-block',
        stagger: stagger2,
        easing: easing,
        delay: delay
      });
      $('#home .section-subtitle .char:nth-child(even)').velocity('transition.bfcSlideDownIn_-15', {
        display: 'inline-block',
        stagger: stagger2,
        easing: easing,
        delay: delay
      });

      $('.col-countdown:nth-child(odd)').velocity('transition.bfcSlideDownIn_60', {
        display: 'inline-block',
        duration: _animationDuration,
        easing: easing,
        delay: delay
      });
      $('.col-countdown:nth-child(even)').velocity('transition.bfcSlideUpIn_-60', {
        display: 'inline-block',
        duration: _animationDuration,
        easing: easing,
        delay: delay
      });

      $('.section-divider').velocity({
        translateZ: 0,
        scaleX: [1, 0],
        opacity: [1, 0]
      }, {
        duration: _animationDuration - 500,
        easing: easing,
        delay: delay
      });
    });
  }

/*==============================================================================
menu
==============================================================================*/
  function fn_menu() {
    var $menuToggle = $('#menu-toggle');
    var $form = $('#form');

    $menuToggle.on('click', function(e) {
      e.preventDefault();

      $body.toggleClass('menu-in');

      if ($body.hasClass('menu-in')) {
        $('#site-main, .header-brand, #site-footer').velocity('stop').velocity('fadeOut', {
          duration: 500,
          easing: 'easeOutQuart',
          queue: false
        });
        $form.velocity('stop').velocity({
          scale: [1, 0.5],
          opacity: [0.85, 0]
        }, {
          display: 'block',
          duration: 800,
          easing: 'easeOutQuart',
          queue: false
        });
      } else {
        $('#site-main, .header-brand, #site-footer').velocity('stop').velocity('fadeIn', {
          duration: 800,
          easing: 'easeInQuart',
          queue: false
        });
        $form.velocity('stop').velocity({
          scale: 0.5,
          opacity: 0
        }, {
          duration: 800,
          easing: 'easeOutQuart',
          queue: false
        });
      }
    });
  }

/*==============================================================================
core
==============================================================================*/
  function fn_core() {

    // bind click event to all internal page anchors
    $('a[href=#]').bind('click', function(e) {
      e.preventDefault();
    });

    // add style class
    $body.addClass(_mainColor);
    $('head').append(
      '<style id="js-css">' +
       '.light #overlay { background-color: ' + _lightOverlayColor + '; }' +
       '.light #form { background-color: ' + _lightFormOverlayColor + '; }' +
       '.dark #overlay { background-color: ' + _darkOverlayColor + '; }' +
       '.dark #form { background-color: ' + _darkFormOverlayColor + '; }' +
      '</style>'
    );

    if (_border) {
      $body.addClass('is-border');
    }
  }

/*=================================================
effect
=================================================*/
  function fn_effect() {
    if (_effect == 0) {
      $('#effect, #js-canvas').remove();
    } else if (_effect == 1) {
      fn_cloud();
    } else if (_effect == 2) {
      fn_star();
    }
  }

  function fn_star() {
    var $canvas = $('#js-canvas');

    $('#effect').remove();
    $body.addClass('is-star');

    function callCanvas (canvas) {
      var screenpointSplitt = 12000
      var movingSpeed = 0.2
      var viewportWidth = $(window).width();
      var viewportHeight = $(window).height();
      var nbCalculated = Math.round(viewportHeight*viewportWidth/screenpointSplitt);

      var $this = $(this),
      ctx = canvas.getContext('2d');
      $this.config = {
        star: {
          color: _starColor,
          width: _starWidth
        },
        line: {
          color: _starColor,
          width: 0.4
        },
        position: {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5
        },
        velocity: movingSpeed,
        length: nbCalculated,
        distance: 100,
        radius: 120,
        stars: []
      };

      function Star () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = ($this.config.velocity - (Math.random() * 0.3));
        this.vy = ($this.config.velocity - (Math.random() * 0.3));

        this.radius = Math.random() * $this.config.star.width;
      }

      Star.prototype = {
        create: function(){
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        },

        animate: function(){
          var i;
          for(i = 0; i < $this.config.length; i++){

            var star = $this.config.stars[i];

            if(star.y < 0 || star.y > canvas.height){
              star.vx = star.vx;
              star.vy = - star.vy;
            }
            else if(star.x < 0 || star.x > canvas.width){
              star.vx = - star.vx;
              star.vy = star.vy;
            }
            star.x += star.vx;
            star.y += star.vy;
          }
        },

        line: function(){
          var length = $this.config.length,
            iStar,
            jStar,
            i,
            j;

          for(i = 0; i < length; i++){
            for(j = 0; j < length; j++){
              iStar = $this.config.stars[i];
              jStar = $this.config.stars[j];

              if(
                (iStar.x - jStar.x) < $this.config.distance &&
                (iStar.y - jStar.y) < $this.config.distance &&
                (iStar.x - jStar.x) > - $this.config.distance &&
                (iStar.y - jStar.y) > - $this.config.distance
              ) {
                if(
                  (iStar.x - $this.config.position.x) < $this.config.radius &&
                  (iStar.y - $this.config.position.y) < $this.config.radius &&
                  (iStar.x - $this.config.position.x) > - $this.config.radius &&
                  (iStar.y - $this.config.position.y) > - $this.config.radius
                ) {
                  ctx.beginPath();
                  ctx.moveTo(iStar.x, iStar.y);
                  ctx.lineTo(jStar.x, jStar.y);
                  ctx.stroke();
                  ctx.closePath();
                }

              }
            }
          }
        }

      };
      $this.createStars = function () {
        var length = $this.config.length,
          star,
          i;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(i = 0; i < length; i++){
          $this.config.stars.push(new Star());
          star = $this.config.stars[i];
          star.create();
        }

        star.animate();
      };

      $this.setCanvas = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      $this.setContext = function () {
        ctx.fillStyle = $this.config.star.color;
        ctx.strokeStyle = $this.config.line.color;
        ctx.lineWidth = $this.config.line.width;
        ctx.fill();
      };

      $this.loop = function (callback) {
        callback();
        reqAnimFrame(function () {
          $this.loop(function () {
            callback();
          });
        });
      };

      $this.bind = function () {
        $(window).on('mousemove', function(e){
          $this.config.position.x = e.pageX;
          $this.config.position.y = e.pageY;
        });
      };

      $this.init = function () {
        $this.setCanvas();
        $this.setContext();

        $this.loop(function () {
          $this.createStars();
        });

        $this.bind();
      };

      return $this;
    }

    var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

    $canvas.hide();

    $(window).on('load', function() {
      setTimeout(function () {
        callCanvas($('canvas')[0]).init();
        $canvas.velocity('transition.fadeIn', {
          duration: 3000
        });
      }, 2000);
    });

    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = '';
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
      };
    })();

    $(window).resize(function () {
      waitForFinalEvent(function(){
        callCanvas($('canvas')[0]).init();
      }, 800, '');
    });
  }


/*=================================================
subscribe form
=================================================*/
  function fn_subscribeForm() {
    var $form = $('#form-subscribe');

    $form.validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      errorPlacement: function(error, element) {},
      submitHandler: function(form) {
        $(form).ajaxSubmit({
          type: 'POST',
          url: 'assets/php/subscribe.php',
          dataType: 'json',
          cache: false,
          data: $form.serialize(),
          beforeSubmit: function() {
          },
          success: function(data) {
            if (data.code == 0) {
              $form.validate().resetForm();
              $form.find('.form-control').removeClass('valid error');
              $form.find('button').blur();
            }
            $.amaran({
              position: 'top right',
              clearAll: true,
              content: {
                themeName: 'bfc-theme',
                icon: data.code == 0 ? 'ion-checkmark-round' : 'ion-close-round',
                status: data.code == 0 ? 'valid' : 'error',
                message: data.message
              },
              themeTemplate: function(data) {
                return '<div class="notify"><p class="notify-message"><i class="notify-icon ' +data.icon+ ' ' +data.status+ '"></i>' +data.message+ '</p></div>';
              },
              afterEnd : function() {
                $('.amaran-wrapper').remove();
              }
            });
          },
          error: function(data) {
            $.amaran({
              position: 'top right',
              clearAll: true,
              content: {
                themeName: 'bfc-theme',
                icon: 'ion-close-round',
                message: 'An error occurred. Please try again later'
              },
              themeTemplate: function(data) {
                return '<div class="notify"><p class="notify-message"><i class="notify-icon error ' +data.icon+ '"></i>' +data.message+ '</p></div>';
              },
              afterEnd : function() {
                $('.amaran-wrapper').remove();
              }
            });
          }
        });
      },
      invalidHandler: function(event, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
          var message = errors == 1
            ? 'Please enter a valid email address'
            : 'Please enter a valid email address';
          $.amaran({
            position: 'top right',
            clearAll: true,
            content: {
              themeName: 'bfc-theme',
              icon: 'ion-close-round',
              message: message
            },
            themeTemplate: function(data) {
              return '<div class="notify"><p class="notify-message"><i class="notify-icon error ' +data.icon+ '"></i>' +data.message+ '</p></div>';
            },
            afterEnd : function() {
              $('.amaran-wrapper').remove();
            }
          });
        }
      }

    });
  }

/*=================================================
ie9 placeholder
=================================================*/
  function fn_placeholder() {
    if (isIE9) {
      $('input, textarea').placeholder({customClass: 'placeholder'});
    }
  }

/*=================================================
countdown
=================================================*/
  function fn_countdown() {
    var $countdown = $('#countdown');

    if ($countdown.length && _countdown) {
      $countdown.downCount({
        date: _countdownDate,
        offset: _countdownTimezone
      });
    } else {
      $countdown.remove();
    }
  }

/*=================================================
background control
=================================================*/
  function fn_bgStyle() {
    if (_bgStyle == 1) {
      fn_imgBg();
    } else if (_bgStyle == 2) {
      fn_slider();
    } else if (_bgStyle == 3) {
      fn_videoBg();
    } else if (_bgStyle == 4) {
      fn_ytVideoBg();
    }
  }

/*=================================================
 * image background
=================================================*/
  function fn_imgBg() {
    $('#video').remove();
    $body.addClass('is-img');
  }

  function fn_slider() {
    $('#video').remove();
    $body.addClass('slider-bg');
    for (var i = 1; i <= _imgAmount; i++) {
      $('#img').append('<img src="assets/img/bg/slideshow-' + (i < 10 ? '0' + i : i) + '.jpg">');
    }

    $(window).on('load', function() {
      if (_kenburn == 1) {
        $('#img').kenburnsy({
          fullscreen: true,
          duration: 9000,
          fadeInDuration: 1500
        });
      } else {
        $('#img').ss({
          fullscreen: true,
          duration: 9000,
          fadeInDuration: 1500
        });
      }
    });
  }

/*=================================================
 * youtube video background
=================================================*/
  function fn_ytVideoBg() {
    var $video = $('#video');
    var $volume = $('#volume');
    var $volumeBar = $volume.find('span');

    $body.addClass('is-yt-video');
    if (!isMobile) {
      $video.attr('data-property', '{videoURL: _ytUrl, autoPlay: true, loop: _ytLoop, startAt: _ytStart, stopAt: _ytEnd, mute: _ytMute, quality: _ytQuality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}');
      $video.YTPlayer();

      if (_ytRemoveVolume) {
        $volume.remove();
      }
      if (_ytMute) {
        $body.addClass('volume-off');
      } else {
        fn_volumeOn();
        $body.addClass('volume-on');
      }     
      $volume.on('click', function() {
        var video = document.getElementById('video-bg');
        $body.toggleClass('volume-off volume-on', function() {
          if ($body.hasClass('volume-off')) {
            $video.unmuteYTPVolume();
            fn_volumeOn();
          } else if ($body.hasClass('volume-on')) {
            $video.muteYTPVolume();
            $volumeBar.each(function() {
              $(this).velocity('stop', true).velocity({
                height: '5px'
              });
            });
          }
        }());
      });
    }
  }

/*=================================================
video background
=================================================*/
  function fn_videoBg() {
    var $video = $('#video');
    var $volume = $('#volume');
    var $volumeBar = $volume.find('span');

    $body.addClass('is-video');
    if (!isMobile) {
      $video.append('<video id="video-bg" autoplay loop><source src="assets/video/video.mp4" type="video/mp4"></video>');
      if (_videoMute) {
        var video = document.getElementById('video-bg');
        video.muted = true;
      }
      if (_removeVolume) {
        $volume.remove();
      }
      if (_videoMute) {
        $body.addClass('volume-off');
      } else {
        fn_volumeOn();
        $body.addClass('volume-on');
      }     
      $volume.on('click', function() {
        var video = document.getElementById('video-bg');
        $body.toggleClass('volume-off volume-on', function() {
          if ($body.hasClass('volume-off')) {
            video.muted = false;
            fn_volumeOn();
          } else if ($body.hasClass('volume-on')) {
            video.muted = true;
            $volumeBar.each(function() {
              $(this).velocity('stop', true).velocity({
                height: '5px'
              });
            });
          }
        }());
      });
    }
  }


/*=================================================
document on ready
=================================================*/
  $(document).on('ready', function() {

    fn_core();
    fn_bgStyle();
    fn_effect();

  });

/*=================================================
window on resize
=================================================*/
  $(window).on('resize', function() {

  });

})(jQuery);
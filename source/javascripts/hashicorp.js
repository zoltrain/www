// add dropshadow to nav on scroll
$(document).ready(function(){
  $(document).scroll(function() {
    var nav = $('nav');
    var topPos = $(document).scrollTop();

    if (topPos <= 0) {
      nav.removeClass("drop-shadow");
    } else {
      if (!nav.hasClass('drop-shadow')) {
        nav.addClass("drop-shadow");
      }
    }
  });
});

// scroll to top
$(document).ready(function(){
  $('.contact').click(function(){
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 600);
    return false;
  });
});


//slider
(function ($, global) {
  var HSHC = global.HSH || {};

  HSHC.Utils =  (function () {
    return {
    //check for mobile user agents
      isMobile : (function(){
               if( navigator.userAgent.match(/Android/i)
               || navigator.userAgent.match(/webOS/i)
               || navigator.userAgent.match(/iPhone/i)
               || navigator.userAgent.match(/iPod/i)
               || navigator.userAgent.match(/BlackBerry/i)
               || navigator.userAgent.match(/Windows Phone/i)
               ){
                      return true;
                }
               else {
                  return false;
                }
      })()
    }

  }());

  HSHC.Slider = (function () {
    return {

      ui : null,

      init: function () {
        var _this = this;

        //cache elements
        this.ui = {
          $doc: $(window),
          $slider: $('#slider'),
          $pagination: null
        }

        this.initSlider();
        this.addEventListeners();
      },

      addEventListeners: function(){
        var _this = this;

        if(HSHC.Utils.isMobile)
          return;

        _this.ui.$doc.scroll(function() {
          var top = _this.ui.$doc.scrollTop(),
              speedAdj = (top*0.6),
              speedAdjOffset = speedAdj - top;

          _this.ui.$slider.css('webkitTransform', 'translate(0, '+ speedAdj +'px)');
          _this.ui.$slider.find('.container').css('webkitTransform', 'translate(0, '+  speedAdjOffset +'px)');
        })
      },

      initSlider: function(){
        this.ui.$slider.slidesjs({
          width: 940,
          height: 528,
          navigation: {
            effect: "fade"
          },
          pagination: {
            effect: "fade"
          },
          play: {
            active: false,
            effect: "fade",
            interval: 4500,
            auto: true,
            restartDelay: 20000
          },
          effect: {
            fade: {
              speed: 10,
              crossfade: false
            }
          },
          callback: {
            start: function(number) {
              if(!HSHC.Utils.isMobile) {
                $('.slide').addClass('animate-slide');
              }
            }
        }
        });

        this.ui.$pagination = $('.slidesjs-pagination');
      }

    }
  }());

  $( document ).ready(function() {
    if($('#slider').length > 0){
      HSHC.Slider.init();
    }
  });

}(jQuery, this));


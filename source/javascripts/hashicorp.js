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

  HSHC.Slider = (function () {
    return {

      ui : null,

      init: function () {
        var _this = this;

        //cache elements
        this.ui = {
          $slider: $('#slider')
        }
        
        this.initSlider();
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
          effect: {
            fade: {
              speed: 400
            }
          }
        });        
      }

    }
  }());
  
  $( document ).ready(function() {
    if($('#slider').length > 0){
      HSHC.Slider.init();
    }
  });

}(jQuery, this));


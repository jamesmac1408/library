function loopedCarousel(el, opts) {
  this.el = $('#' + el);
  this.opts = opts;
  this.pips = [];
  this.numberOfFlankingPips = 2;
  this.initialised = false;

  this._setActivePips = function() {
    // set active pip
    $(this.pips[this.activeIndex]).css('visibility', 'visible');
    var props = {
      'height'          : '16px',
      'width'           : '16px',
      'backgroundColor' : '#DE007B',
      'borderRadius'    : '2px',
      'opacity'         : '1',
    };
    if (this.initialised) {
      $(this.pips[this.activeIndex]).children().animate(props, 300);
    } else {
      $(this.pips[this.activeIndex]).children().css(props);
    }

    // set pips to the left to inactive    
    if (this.activeIndex > this.numberOfFlankingPips) {
      for (var i = 0; i < (this.activeIndex - (this.numberOfFlankingPips)); i += 1) {
        this._fadeOutPip(i);
      }
    }
    // set pips to the right to inactive
    if ((this.activeIndex - 1) < this.pips.length) {
      for (var i = this.activeIndex + this.numberOfFlankingPips + 1; i < this.pips.length; i += 1) {
        this._fadeOutPip(i);
      }
    }

    // set 'in' pips
    for (var i = this.activeIndex - (this.numberOfFlankingPips); i <= (this.activeIndex + this.numberOfFlankingPips); i += 1) {
      this._fadeInPip(i);
    }
  }

  this._calcParentWidth = function() {
    this.parentWidth = this.el.width();
  }

  this._positionPipsCarousel = function(animate) {
    var left = (this.parentWidth / 2) - (this.activeIndex * this.pipWidth) - (this.pipWidth / 2);

    if (animate) {
      this.pipsCarousel.animate({
        left: parseInt(left),
      }, 300);
    } else {
      this.pipsCarousel.css('left', left);
    }
  }

  this._setActivePip = function(index) {
    this.activeIndex = index;

    this._positionPipsCarousel(true);
    this._setActivePips();
  }

  this._setPipDefaultStyles = function(pip, opacity, animate, callback) {
    var props = {
      'height': '8px',
      'width': '8px',
      'backgroundColor': '#E0E0E0',
      'borderRadius': '1px',
      'opacity': opacity
    };
    if (this.initialised) {
      $(pip).children().animate(props, 300, function() {
        if (callback) {
          callback();
        }
      });
    } else {
      $(pip).children().css(props);
      this.pipWidth = $(pip)[0].offsetWidth;
      if (callback) {
        callback();
      }
    }
  }

  this._fadeOutPip = function(index) {
    var self = this;
    if (this.pips[index]) {
      this._setPipDefaultStyles(this.pips[index], 0, true, function() {
        $(self.pips[index]).css('visibility', 'hidden');
      });
    }
  }

  this._fadeInPip = function(index) {
    if (this.pips[index] && index !== this.activeIndex) {
      var pip = $(this.pips[index]);
      // fade in if was not visible
      if (pip.css('visibility') === 'hidden') {
        pip.css('visibility', 'visible');
      }
      this._setPipDefaultStyles(pip, 1, true);
    }
  }

  this._initMainSlider = function() {
    var defaultOpts = {
      arrows: false,
      dots: true,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: 0,
      autoplaySpeed: 2000,
      autoplay: false,
    }
    // rough object.assign, default options -> passed in options
    for (var opt in defaultOpts) {
      if (this.opts.hasOwnProperty(opt)) {
        defaultOpts[opt] = this.opts[opt];
      }
    }
    this.el.slick(defaultOpts);
    this.pipsCarousel = this.el.children('.slick-dots'); 
    this.pips = this.pipsCarousel.children('li');
    this._setActivePips();
  }

  this._addEvents = function() {
    var self = this;
    this.el.on('beforeChange', function(evt, slick, currentSlide, nextSlide) {
      if (currentSlide !== nextSlide) {
        self._setActivePip(nextSlide);
      }
    });

    $(window).resize(function() {
      self._positionPipsCarousel(false);
      self._calcParentWidth();
    });

    $(window).on("orientationchange",function(){
      self._positionPipsCarousel(false);
      self._calcParentWidth();
    });
  }

  this.init = function() {
    if (this.el.length < 0) {
      throw Error('Could not find main carousel element!');
    }

    this.activeIndex = 0;
    this._initMainSlider();
    this._calcParentWidth();
    this._positionPipsCarousel(false);
    this._addEvents();

    this.initialised = true;
  }
  this.init();
}
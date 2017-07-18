// Object.assign polyfill (needed for nice inhertiance)
"function"!=typeof Object.assign&&(Object.assign=function(n,t){"use strict";if(null==n)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(n),e=1;e<arguments.length;e++){var o=arguments[e];if(null!=o)for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(r[a]=o[a])}return r});

// 'Super' Carousel 'class'
var Carousel = function(el, opts) {
  // inherited properties
  this.el = $('#' + el);
  this.opts = opts;
  this.dotsCarousel = null;
  this.pips = [];
  this.activeIndex = 0;

  this.init();
}
Carousel.prototype = {
  // 'interface' method that needs to be implemented by subclasses
  onBeforeChange: function(index) {
    this.activeIndex = index;
  },
  _assignOpts: function() {
      var defaultOpts = {
      arrows: true,
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
    return defaultOpts;
  },
  _initMainSlider: function() {
    this.opts = this._assignOpts();

    this.el.slick(this.opts);
    this.dotsCarousel = this.el.children('.slick-dots'); 
    this.pips = this.dotsCarousel.children('li');
  },
  addEvents: function() {
    var self = this;
    this.el.on('beforeChange', function(evt, slick, currentSlide, nextSlide) {
      if (currentSlide !== nextSlide) {
        self.onBeforeChange(nextSlide);
      }
    });
  },
  init: function() {  
    if (this.el.length < 0) {
      throw Error('Could not find main carousel element!');
    }
    this._initMainSlider();
    this.addEvents();
  }
}

var LoopedCarousel = function(el, opts) {
  // 'super()'
  Carousel.call(this, el, opts);
}
LoopedCarousel.prototype = Object.create(Carousel.prototype);
Object.assign(LoopedCarousel.prototype, 
  {
    initialised: false,
    numberOfFlankingPips: 2,
    _setActivePips: function() {
      // set active pip
      $(this.pips[this.activeIndex]).css('visibility', 'visible');
      var props = {
        'height'          : '16px',
        'width'           : '16px',
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
    },

    _calcParentWidth: function() {
      this.parentWidth = this.el.width();
    },

    _positionPipsCarousel: function(animate) {
      var left = (this.parentWidth / 2) - (this.activeIndex * this.pipWidth) - (this.pipWidth / 2);

      if (animate) {
        this.dotsCarousel.animate({
          left: parseInt(left),
        }, 300);
      } else {
        this.dotsCarousel.css('left', left);
      }
    },

    _setActivePip: function(index) {
      this._positionPipsCarousel(true);
      this._setActivePips();
    },

    _setPipDefaultStyles: function(pip, opacity, animate, callback) {
      var props = {
        'height': '8px',
        'width': '8px',
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
    },

    _fadeOutPip: function(index) {
      var self = this;
      if (this.pips[index]) {
        this._setPipDefaultStyles(this.pips[index], 0, true, function() {
          $(self.pips[index]).css('visibility', 'hidden');
        });
      }
    },

    _fadeInPip: function(index) {
      if (this.pips[index] && index !== this.activeIndex) {
        var pip = $(this.pips[index]);
        // fade in if was not visible
        if (pip.css('visibility') === 'hidden') {
          pip.css('visibility', 'visible');
        }
        this._setPipDefaultStyles(pip, 1, true);
      }
    },

    onBeforeChange: function(nextSlide) {
      Carousel.prototype.onBeforeChange.apply(this, arguments);
      this._setActivePip(nextSlide);
    },
    addEvents: function() {
      var self = this;
      $(window).resize(function() {
        self._positionPipsCarousel(false);
        self._calcParentWidth();
      });

      $(window).on("orientationchange",function(){
        self._positionPipsCarousel(false);
        self._calcParentWidth();
      });

      Carousel.prototype.addEvents.apply(this, arguments);
    },
    init: function() {
      // Calling the 'super's init method
      Carousel.prototype.init.apply(this, arguments);

      this.el.addClass('carousel--looped');
      this._setActivePips();
      this._calcParentWidth();
      this._positionPipsCarousel(false);

      this.initialised = true;
    },
  });
LoopedCarousel.prototype.constructor = LoopedCarousel;


var FiniteCarousel = function(el, opts) {
  // 'super()'
  Carousel.call(this, el, opts);
}
FiniteCarousel.prototype = Object.create(Carousel.prototype);
Object.assign(FiniteCarousel.prototype,
  {
    BASE_SPEED: 300,
    initialised: false,

    _loop: function(index, increment, speed) {
      // base case
      if (index === this.pips.length || index < 0) {
        return;
      }
      var props;
      var pip = $(this.pips[index]).children();

      if (index > this.activeIndex) {
        props = {
          width: '0%'
        }
      }
      if (index <= this.activeIndex) {
        props = {
          width: '100%'
        }
      }

      var animate = this.pips[index].width !== props.width;
      this.pips[index].width = props.width;

      if (this.initialised && animate) {
        var self = this;
        pip.animate(props, speed, function() {
          self._loop(index += increment, increment, speed);
        });
      } else {
        pip.css(props);
        this._loop(index += increment, increment, speed);
      }
      pip.width = props.width;
    },

    onBeforeChange: function(nextSlide) {
      var diff = (nextSlide - this.activeIndex);
      var increment = diff;
      if (increment > 1) {
        increment = 1;
      }
      if (increment < -1) {
        increment = -1;
      }

      Carousel.prototype.onBeforeChange.apply(this, arguments);

      var speed = Math.abs(this.BASE_SPEED / diff);
      this._loop((this.activeIndex - diff), increment, speed)
    },
    init: function() {
      Carousel.prototype.init.apply(this, arguments);

      this.loopIndex = 0;

      this.el.addClass('carousel--finite')
      
      this._loop(0, 1, this.BASE_SPEED);

      this.initialised = true;
    }
  }
);
FiniteCarousel.prototype.constructor = FiniteCarousel;


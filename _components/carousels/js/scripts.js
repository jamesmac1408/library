// bind polyfill
Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),n=this,i=function(){},r=function(){return n.apply(this instanceof i&&t?this:t,o.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,r.prototype=new i,r});
// gets whether 'transform' is available
function getSupportedTransform(){for(var r="transform WebkitTransform MozTransform OTransform msTransform".split(" "),n=document.createElement("div"),t=0;t<r.length;t++)if(n&&void 0!==n.style[r[t]])return r[t];return!1}

function loopedCarousel(el, opts) {
  this.wrapper = $('#' + el);
  this.opts = opts;
  this.pips = [];

  this.numberOfFlankingPips = 2;

  this._setActivePips = function() {

    // this.pips[this.activeIndex].addClass('animatable').addClass('active');
    this.pips[this.activeIndex].css('visibility', '');
    var props = {
      'height': '16px',
      'width': '16px',
      'backgroundColor': '#DE007B',
      'borderRadius': '2px',
      'opacity': '1',
    };
    if (this.initialised) {
      this.pips[this.activeIndex].find('.pip').animate(props, 300);
      this._pipTransitionEnd(this.pips[this.activeIndex]);
    } else {
      console.log('here');
      this.pips[this.activeIndex].find('.pip').css(props);
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

    // set active pip
  }

  this._setMainCarousel = function(index) {
    this.el.slick('slickGoTo', index);
  }

  this._calcParentWidth = function() {
    this.parentWidth = this.pipsCarousel.width();
  }

  this._positionPipsCarousel = function(animate) {
    var speed;
    if (animate) {
      speed = 300;
    } else {
      speed = 0;
    }
    var left = -(this.activeIndex * this.pipWidth) - (this.pipWidth / 2) + (this.parentWidth / 2);

    if (animate) {
      this.track.animate({
        left: parseInt(left),
      }, speed);
    } else {
      this.track.css('left', left);
    }
  }

  this._pipTransitionEnd = function(pip, callback) {
    // I would like to use transitionend but unfortuantly there's not enough support.
    setTimeout(function() {
      pip.removeClass('animatable');
      if (callback) {
        callback();
      }
    }, 300)
  }

  this._setActivePip = function(index) {
    this.previousActiveIndex = this.activeIndex;
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
      pip.find('.pip').animate(props, 300);
      this._pipTransitionEnd(pip, callback);
    } else {
      pip.find('.pip').css(props);
      this.pipWidth = pip[0].offsetWidth;
    }
  }

  this._fadeOutPip = function(index) {
    var self = this;
    if (this.pips[index]) {
      this._setPipDefaultStyles(this.pips[index], 0, true, function() {
        self.pips[index].css('visibility', 'hidden');
      });
    }
  }

  this._fadeInPip = function(index) {
    if (this.pips[index] && index !== this.activeIndex) {
      var pip = this.pips[index];
      // fade in if was not visible
      if (pip.css('visibility') === 'hidden') {
        pip.css('visibility', '');
      }
      this._setPipDefaultStyles(pip, 1, true);
    }
  }

  this._createPips = function() {
    var banners  = this.el.find('.banner');
    this.track = $('<div class="pips-track"></div>');
    this.pipsCarousel.append(this.track);

    for (var i = 0; i < banners.length; i += 1) {
      var pip = $('<button class="pip-container"><div class="pip"></div></button>');
      this.pips.push(pip);
      this.track.append(pip);
    }

    this._setActivePips();
    this.initialised = true;
  }

  this._initMainSlider = function() {
    var defaultOpts = {
      arrows: false,
      dots: false,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: 0,
      autoplaySpeed: 2000,
      autoplay: false,
    }
    // rough object assign, default options -> passed in options
    for (var opt in defaultOpts) {
      if (this.opts.hasOwnProperty(opt)) {
        defaultOpts[opt] = this.opts[opt];
      }
    }
    this.el.slick(defaultOpts);
  }

  this._addEvents = function() {
    var self = this;
    this.el.on('beforeChange', function(evt, slick, currentSlide, nextSlide) {
      if (currentSlide !== nextSlide) {
        self._setActivePip(nextSlide);
      }
    });
    
    for (var i = 0; i < this.pips.length; i += 1) {
        self.pips[i].on('click', this._setMainCarousel.bind(null, i));
    }

    $(window).resize(function() {
      self._positionPipsCarousel(false);
      self._calcParentWidth();
    })
  }

  this.init = function() {
    this.initialised = false;

    if (this.wrapper.length < 0) {
      throw Error('Could not find wrapper element!');
    }

    this.el = this.wrapper.find('.carousel');
    this.pipsCarousel = this.wrapper.find('.pips-carousel'); 

    if (this.el.length < 0) {
      throw Error('Could not find main carousel element!');
    }
    if (this.pipsCarousel.length < 0) {
      throw Error('Could not find pipsCarousel element!');
    }

    if (this.wrapper.length < 0 || this.el.length < 0 || this.pipsCarousel.length < 0) {
      return;
    }

    this._setMainCarousel = this._setMainCarousel.bind(this);

    this.previousActiveIndex = -1;
    this.activeIndex = 0;
    this._createPips();
    this._calcParentWidth();
    this._positionPipsCarousel(false);
    this._initMainSlider();
    this._addEvents();
  }

  this.init();

}
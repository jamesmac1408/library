Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),n=this,i=function(){},r=function(){return n.apply(this instanceof i&&t?this:t,o.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,r.prototype=new i,r});

function loopedCarousel(el, pipsCarousel) {
  this.wrapper = $('#' + el);
  this.pips = [];

  this.numberOfFlankingPips = 2;

  var inactiveState = {
    
  }

  this._setActivePips = function() {
    
    // set active pip
    this.pips[this.activeIndex].find('.pip').animate({
      height: '16px',
      width: '16px',
      backgroundColor: '#DE007B',
      borderRadius: '2px',
    }, 300);

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
    for (var i = this.activeIndex - (this.numberOfFlankingPips + 1); i <= (this.activeIndex + this.numberOfFlankingPips); i += 1) {
      this._fadeInPip(i);
    }
  }

  this._setMainCarousel = function(index) {
    this.el.slick('slickGoTo', index);
  }

  this._calcParentWidth = function() {
    this.parentWidth = this.wrapper.width();
  }

  this._positionPipsCarousel = function(animate) {
    var speed;
    if (animate) {
      speed = 300;
    } else {
      speed = 0;
    }
    var left = (this.parentWidth / 2) - (this.activeIndex  * this.pipWidth) - (this.pipWidth / 2);
    this.pipsCarousel.animate({
      left: parseInt(left),
    }, speed);
  }

  this._setActivePip = function(index) {
    this.previousActiveIndex = this.activeIndex;
    this.activeIndex = index;

    this._positionPipsCarousel(true);
    this._setActivePips();
  }

  this._setPipInactive = function(pip, opacity, animate, callback) {
    var speed;
    if (animate) {
      speed = 300;
    } else {
      speed = 0;
    }
    pip.animate({
      height: '8px',
      width: '8px',
      backgroundColor: '#E0E0E0',
      borderRadius: '1px',
      opacity: opacity
    }, speed, callback)
  }

  this._fadeOutPip = function(index) {
    var self = this;
    if (this.pips[index]) {
      this._setPipInactive(this.pips[index].find('.pip'), 0, true, function() {
        self.pips[index].css('visibility', 'hidden');
      });
    }
  }

  this._fadeInPip = function(index) {
    if (this.pips[index]) {
      var pip = this.pips[index].find('.pip');
      // properties to animate
      var properties = {};
      // fade in if was not visible
      if (this.pips[index].css('visibility') === 'hidden') {
        this.pips[index].css('visibility', 'visible');
        properties.opacity = 1;
      }
      // remove active properties if was previously active
      if (index === this.previousActiveIndex) {
        this._setPipInactive(this.pips[index].find('.pip'), 1, true);
      }
      pip.animate(properties, 400);
    }
  }

  this._createPips = function() {
    var banners  = this.el.find('.banner');

    for (var i = 0; i < banners.length; i += 1) {
      var pip = $('<button class="pip-container"><div class="pip"></div></button>');
      this.pips.push(pip);
      this.pipsCarousel.append(pip);
      this._setPipInactive(pip.find('.pip'), 0, false);
    }

    this.pipWidth = this.pips[0][0].offsetWidth;
    this._setActivePips();
  }

  this._initMainSlider = function() {
    this.el.slick({
      slidesToShow: 1,
      centerPadding: 0,
      centerMode: true,
      dots: false,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 2000,
    });
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

    console.log(this.wrapper);

    if (this.el.length < 0) {
      throw Error('Could not find main carousel element!');
    }
    if (this.pipsCarousel.length < 0) {
      throw Error('Could not find pipsCarousel element!');
    }

    if (this.wrapper.length < 0 || this.el.length < 0 || this.pipsCarousel.length < 0) {
      return;
    }

    this.initialised = true;

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

// THIS CODE HAS GOTTEN MESSY, I KNOW
// TODO: Clean up

function TableOfContents(el) {
  this.base = el;
  this.furthestTitle = null;
  this.active = false;

  this._highlightTitles = function(scrollTop) {
    var furthestTitle = 0;
    for (var i = 0; i < this.titles.length; i++) {
      var rect = this.titles[i].getBoundingClientRect();
      if (rect.top < IN_VIEW_THRESHOLD) {
        furthestTitle = i;
        this.links[i].classList.add('active');
      } else {
        this.links[i].classList.remove('active');
      }
    }
    this._updateScrollIndicator(scrollTop, furthestTitle);
  }

  this._updateScrollIndicator = function(scrollTop, furthestTitle) {
    if (this.titles[furthestTitle]) {

      this.furthestTitle = furthestTitle;

      var currElementDistance = null;
      var nextElementDistance = null;

      var currTitleOffsetTop = this.titles[furthestTitle].offsetTop;

      if (furthestTitle === (this.titles.length - 1)) {
        var componentOffsetBottom = (this.component.offsetTop + this.component.offsetHeight) ;

        this.nextElementDistance = componentOffsetBottom;
        this.currElementDistance = currTitleOffsetTop;

      } else {
        var nextTitleOffsetTop = this.titles[furthestTitle + 1].offsetTop;

        this.nextElementDistance = nextTitleOffsetTop;
        this.currElementDistance = currTitleOffsetTop;
      }
    }

    goal = this.nextElementDistance - this.currElementDistance;
    distance = goal - (this.nextElementDistance - scrollTop - IN_VIEW_THRESHOLD);
    distance = (distance > goal) ? goal : distance;

    var percentage = (distance / goal),
        extraHeight = (33 * percentage),
        height = (33 * (furthestTitle)) + extraHeight;

    this.scrollIndicator.style.height = height + 'px';
  }

  this.initialiseMaxHeight = function() {
    var self = this;

    this.toc.style.maxHeight = 'none';
    this.maxHeight = this.toc.offsetHeight + 12 + 'px';

    requestAnimationFrame(function() {
      if (!self.active) {
        self.toc.style.maxHeight = '0px';
        self.toc.style.opacity = 0;
      }
      self.toc.classList.add('animatable');
    });
  }

  this.update = function(active, scrollTop) {
    if (active) {
      if (!this.active) {
        this.active = true;
        this.body.classList.add('active');
        this.toc.style.maxHeight = this.maxHeight;
        this.toc.style.opacity = 1;
      }
      this._highlightTitles(scrollTop);
    } else if (this.active) {
        this.active = false;
        this.toc.style.maxHeight = '0px';
        this.toc.style.opacity = 0;
        this.scrollIndicator.style.height = '0px';
        this.body.classList.remove('active');
    }
  }

  this.getComponent = function() {
    return this.component;
  }

  this._scrollToTitle = function(index) {
    doScrolling(this.titles[index], 300);
  }

  this._addEvents = function() {
    var self = this;
    for (var i = 0; i < this.links.length; i += 1) {
        self.links[i].addEventListener('click', this._scrollToTitle.bind(null, i));
    }
  }

  this._init = function() {
    this._scrollToTitle = this._scrollToTitle.bind(this);

    this.component = document.getElementById(this.base + '-component');
    this.body = document.getElementById(this.base + '-nav');
    this.scrollIndicator = this.body.querySelector('.scrollIndicator');
    this.toc = this.body.querySelector('.toc');

    if (!this.component) {
      return;
    }

    this.initialiseMaxHeight();
    
    this.titles = [];
    this.links = this.body.querySelectorAll('a');
    for (var i = 0; i < this.links.length; i++) {
      // this makes me feel ill but is necessary, sorry
      var id = /.*#(.*)/.exec(this.links[i].getAttribute('href'))[1].replace('+', '\\+')
      this.titles.push(this.component.querySelector('#' + id));
    }

    this._addEvents();
  }

  this._init();
}
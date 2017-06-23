function TableOfContents(el) {
  this.base = el;
  this.furthestTitle = null;

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
    // only update these values when we have a new 'furthestTitle' (perf)
    if (furthestTitle !== this.furthestTitle) {
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
        height = (33 * (furthestTitle + 1)) + extraHeight;

    this.scrollIndicator.style.height = height + 'px';
  }

  this.hideToc = function() {
    this.maxHeight = this.toc.getBoundingClientRect().height;
    this.toc.style.maxHeight = '0px';
  }

  this.update = function(active, scrollTop) {
    
    if (active) {
      this.body.classList.add('active');
      this.toc.style.maxHeight = this.maxHeight + 'px';
      this._highlightTitles(scrollTop);
    } else {
      this.toc.style.maxHeight = '0px';
      this.body.classList.remove('active');
    }
  }

  this.getComponent = function() {
    return this.component;
  }

  this._init = function() {
    this.component = document.getElementById(this.base + '-component');
    this.body = document.getElementById(this.base + '-nav');
    this.scrollIndicator = this.body.querySelector('.scrollIndicator');
    this.toc = this.body.querySelector('.toc');

    if (!this.component) {
      return;
    }

    this.hideToc();
    
    this.titles = [];
    this.links = this.toc.querySelectorAll('li > a');
    for (var i = 0; i < this.links.length; i++) {
      this.titles.push(this.component.querySelector(this.links[i].getAttribute('href')));
    }
  }

  this._init();
}
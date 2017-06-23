/*
  ============ Drawer ============
*/

var main = document.querySelector('.main');
var IN_VIEW_THRESHOLD = 100;

function Drawer(el) {
  this.drawerContainer = el;
  this.drawer = el.querySelector('.drawer');
  this.tocs = el.querySelectorAll('.toc');
  this.active = false;

  this.toggle = function() {
    if (this.active) {
      this._hideDrawer();
    } else {
      this._showDrawer();
    }
  }

  this._showDrawer = function() {
    this.active = true;
    this.drawerContainer.classList.add('in');
    var self = this;
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        self.drawerContainer.classList.add('active');
        document.body.addEventListener('touchend', self._onBodyClick);
      });
    });
  }

  this._removeDrawer = function() {
    this.drawerContainer.removeEventListener('transitionend', this._removeDrawer);
    this.active = false;
    this.drawerContainer.classList.remove('in');
  }

  this._hideDrawer = function() {
    if (!this.active) {
      return;
    }

    document.body.removeEventListener('touchend', this._onBodyClick);
    this.drawerContainer.classList.remove('active');
    this.drawerContainer.addEventListener('transitionend', this._removeDrawer);
  }

  this._onBodyClick = function(evt) {
    if (!this.active) {
      return;
    }

    if (!this.drawer.contains(evt.target)) {
      this._hideDrawer();
    }
  }

  this._updateTocs = function() {
    this.ticking = false;

    var tocsInView = [],
        keys = Object.keys(this.tocs);

    for (var i = 0; i < keys.length; i++) {

      var component = this.tocs[keys[i]].getComponent(),
          bottom = (component.offsetTop + component.offsetHeight) - this.latestKnownScrollY;

      if (bottom > 0) {
        tocsInView.push(this.tocs[keys[i]]);
      }
    }
    
    var tocToShow = tocsInView[0];
    for (var i = 0; i < keys.length; i++) {
        var toShow = (this.tocs[keys[i]] === tocToShow);
        this.tocs[keys[i]].update(toShow, this.latestKnownScrollY);
    }
  }

  this._requestTick = function() {
    if (!this.ticking) {
      requestAnimationFrame(this._updateTocs);
    }
    this.ticking = true;
  }

  // debounces scroll events
  this._onScroll = function() {
    this.latestKnownScrollY = main.scrollTop;
	  this._requestTick();
  }

  this._addEventListeners = function() {
    /* close drawer on clicking a link */
    var links = this.drawer.querySelectorAll('.collection-listItem > a');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', this._hideDrawer);
    }
    /* scroll listener */
    main.addEventListener('scroll', this._onScroll);
    window.addEventListener('hashchange', this._onScroll);
  }

  this._init = function() {
    // sets up debouncing of scroll events
    this.latestKnownScrollY = 0;
  	this.ticking = false;

    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);
    this._updateTocs = this._updateTocs.bind(this);
    this._requestTick = this._requestTick.bind(this);
    this._onScroll = this._onScroll.bind(this);

    this.tocs = {};
    this.components = Array.prototype.slice.call(document.querySelectorAll('.component'));
    for (var i = 0; i < this.components.length; i++) {
      var component = /(.*)-component/.exec(this.components[i].getAttribute('id'))[1];
      this.tocs[component] = new TableOfContents(component);
    }


    this._updateTocs();

    this._addEventListeners();
  }

  this._init();
}

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

  this.update = function(active, scrollTop) {
    
    if (active) {
      this.body.classList.add('active');
      this._highlightTitles(scrollTop);
    } else {
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

    this.titles = [];
    this.links = this.toc.querySelectorAll('li > a');
    for (var i = 0; i < this.links.length; i++) {
      this.titles.push(this.component.querySelector(this.links[i].getAttribute('href')));
    }
  }

  this._init();
}
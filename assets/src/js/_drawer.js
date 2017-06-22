/*
  ============ Drawer ============
*/

var main = document.querySelector('.main');

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
    var height =     main.getBoundingClientRect().height,
        upperRange = main.scrollTop;

    var keys = Object.keys(this.tocs);
    for (var i = 0; i < keys.length; i++) {
      var rect = this.tocs[keys[i]].getComponent().getBoundingClientRect();
      var inView = (
          /* The 40px adjusts for the spacing element */
          (rect.top + main.scrollTop - 40) <= upperRange &&
          (rect.top + rect.height) >= 0
      ) 
      this.tocs[keys[i]].update(inView, main.scrollTop);
    }
  }

  this._addEventListeners = function() {
    /* close drawer on clicking a link */
    var links = this.drawer.querySelectorAll('.collection-listItem > a');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', this._hideDrawer);
    }
    /* scroll listener */
    main.addEventListener('scroll', this._updateTocs);
    window.addEventListener('hashchange', this._updateTocs);
  }

  this._init = function() {
    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);
    this._updateTocs = this._updateTocs.bind(this);

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

  this._highlightTitles = function(scrollTop) {
    for (var i = 0; i < this.titles.length; i++) {
      var rect = this.titles[i].getBoundingClientRect();
      if (rect.top < 112) {
        this.links[i].classList.add('active');
      } else {
        this.links[i].classList.remove('active');
      }
    }
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
    this.toc = this.body.querySelector('.toc');

    this.titles = [];
    this.links = this.toc.querySelectorAll('li > a');
    for (var i = 0; i < this.links.length; i++) {
      this.titles.push(this.component.querySelector(this.links[i].getAttribute('href')));
    }
  }

  this._init();
}
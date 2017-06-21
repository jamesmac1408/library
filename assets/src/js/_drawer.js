/*
  ============ Drawer ============
*/

function Drawer(el) {
  this.drawerContainer = el;
  this.drawer = el.querySelector('.drawer');
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

  this._addEventListeners = function() {
    /* close drawer on clicking a link */
    var links = this.drawer.querySelectorAll('.components-list--item > a');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', this._hideDrawer);
    }
  }

  this._init = function() {
    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);

    this._addEventListeners();
  }

  this._init();
}
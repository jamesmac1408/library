/*
  ============ Drawer ============
*/
import TableOfContents from './_contents-table';

var main = document.querySelector('.main');

class Drawer {

  toggle() {
    if (this.active) {
      this._hideDrawer();
    } else {
      this._showDrawer();
    }
  }

  _showDrawer() {
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

  _removeDrawer() {
    this.drawerContainer.removeEventListener('transitionend', this._removeDrawer);
    this.active = false;
    this.drawerContainer.classList.remove('in');
  }

  _hideDrawer() {
    if (!this.active) {
      return;
    }

    document.body.removeEventListener('touchend', this._onBodyClick);
    this.drawerContainer.classList.remove('active');
    this.drawerContainer.addEventListener('transitionend', this._removeDrawer);
  }

  _onBodyClick(evt) {
    if (!this.active) {
      return;
    }

    if (!this.drawer.contains(evt.target)) {
      this._hideDrawer();
    }
  }

  _updateTocs() {
    this.ticking = false;
    this.activeContents.update(this.latestKnownScrollY);
  }

  _requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(this._updateTocs);
    }
    this.ticking = true;
  }

  // debounces scroll events
  _onScroll(scrollTop) {
    this.latestKnownScrollY = scrollTop;
	  this._requestTick();
  }

  _addEventListeners() {
    /* close drawer on clicking a link */
    var links = this.drawer.querySelectorAll('.collection-listItem a');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', this._hideDrawer);
    }
    /* scroll listener */
    document.body.addEventListener('scroll', () => {
      this._onScroll(document.body.scrollTop);
    });
    main.addEventListener('scroll', () => {
      this._onScroll(main.scrollTop);
    });
    window.addEventListener('resize', this._onScroll);
    window.addEventListener('hashchange', this._onScroll);
  }

  constructor(el) {
    this.drawerContainer = el;
    this.drawer = el.querySelector('.drawer');
    this.tocs = el.querySelectorAll('.toc');
    this.active = false;

    // sets up debouncing of scroll events
    this.latestKnownScrollY = 0;
  	this.ticking = false;

    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);
    this._updateTocs = this._updateTocs.bind(this);
    this._requestTick = this._requestTick.bind(this);
    this._onScroll = this._onScroll.bind(this);

    var activeComponent = document.querySelector('.component');
    var component = /(.*)-component/.exec(activeComponent.getAttribute('id'))[1];
    this.activeContents = new TableOfContents(component)


    this._updateTocs();

    this._addEventListeners();
  }
}

export default Drawer;
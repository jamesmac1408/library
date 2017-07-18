/*
  ============ Drawer ============
*/
import TableOfContents from './_contents-table';

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

  _addEvents() {
    /* close drawer on clicking a link */
    var links = this.drawer.querySelectorAll('.collection-listItem a');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', this._hideDrawer);
    }
    window.addEventListener('resize', this._onScroll);
    window.addEventListener('hashchange', this._onScroll);
  }

  constructor(el) {
    this.drawerContainer = el;
    this.drawer = el.querySelector('.drawer');  
    this.active = false;

    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);

    const activeContents = document.querySelector('.collection-listItem.active');
    if (activeContents) {
      this.activeContents = new TableOfContents(activeContents)
    }

    this._addEvents();
  }
}

export default Drawer;
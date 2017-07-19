/*
  ============ Drawer ============
*/
import TableOfContents from './_contents-table';
import StylesManager from './_styles-manager';

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

  _updateBrand(e) {
    this.stylesManager.setBrand(e.target.value);
  }
  _updateDevice(e) {
    this.stylesManager.setDevice(e.target.value);
  }

  _addEvents() {
    /* close drawer on clicking a link */
    const links = this.drawer.querySelectorAll('.collection-listItem a');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', this._hideDrawer);
    }
    window.addEventListener('resize', this._onScroll);
    window.addEventListener('hashchange', this._onScroll);

    const brandRadios = this.drawer.querySelectorAll('.brands-container input[type="radio"]');
    const deviceRadios = this.drawer.querySelectorAll('.devices-container input[type="radio"]');
    for (var i = 0; i < brandRadios.length; i += 1) {
      brandRadios[i].addEventListener('click', this._updateBrand);
    }
    for (var i = 0; i < deviceRadios.length; i += 1) {
      deviceRadios[i].addEventListener('click', this._updateDevice);
    }
  }

  constructor(el) {
    this.drawerContainer = el;
    this.drawer = el.querySelector('.drawer');  
    this.active = false;

    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);
    this._updateBrand = this._updateBrand.bind(this);
    this._updateDevice = this._updateDevice.bind(this);

    const activeContents = document.querySelector('.collection-listItem.active');
    console.log(activeContents);
    if (activeContents) {
      this.activeContents = new TableOfContents(activeContents)
    }
    this.stylesManager = new StylesManager('very', 'desktop');

    this._addEvents();
  }
}

export default Drawer;
class StylesManager {

  setBrand(brand) {
    this.brand = brand;
    this._loadStyles();
  }

  setDevice(device) {
    this.device = device;
    this._loadStyles();
  }

  _loadStyles() {
    const href = this.currHref.replace(/(.*)dist\/css\/(.*)-(.*).css/, `$1dist/css/${this.device}-${this.brand}.css`);
    this.link.attr("href", href);
    this.currHref = href;
  }

  constructor(brand, device) {
    this.brand = brand;
    this.device = device;
    this.link = $('#dynamicStyles');
    this.currHref = this.link.attr("href");

    this._loadStyles();
  }
}

export default StylesManager;
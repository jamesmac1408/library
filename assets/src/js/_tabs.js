class Tabs {
  _goToTab(index) {
    this.activeIndex = index;
    for (var i = 0; i < this.tabs.length; i++) {
      if (i === this.activeIndex) {
        $(this.links[i]).addClass('active');
        $(this.tabs[i]).css('display', 'block');
      } else {
        $(this.links[i]).removeClass('active');
        $(this.tabs[i]).css('display', 'none');
      }
    }
  }

  _addEvents() {
    for (var i = 0; i < this.links.length; i += 1) {
      $(this.links[i]).on('click', this._goToTab.bind(null, i));
    }
  }

  constructor(el) {
    this.el = $(el);

    this._addEvents = this._addEvents.bind(this);
    this._goToTab = this._goToTab.bind(this);

    this.activeIndex = 0;
    this.links = this.el.find('.tab-link');
    this.tabs = this.el.siblings('.demo-code');

    this._addEvents();
    this._goToTab(0);
  }
}

export default Tabs;
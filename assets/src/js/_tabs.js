function TabController(el) {
  this.el = $(el);

  this._goToTab = function(index) {
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

  this._addEvents = function() {
    for (var i = 0; i < this.links.length; i += 1) {
      $(this.links[i]).on('click', this._goToTab.bind(null, i));
    }
  }

  this.init = function() {
    this._addEvents = this._addEvents.bind(this);
    this._goToTab = this._goToTab.bind(this);

    this.activeIndex = 0;
    this.links = this.el.find('.tab-link');
    this.tabs = this.el.siblings('.demo-code');

    this._addEvents();
    this._goToTab(0);
  }

  this.init();
}
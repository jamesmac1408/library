class Panel {
  _slideUp() {
    this.el.removeClass('active');
    this.body.css('maxHeight', 0);
    this.body.css('opacity', 0);
  }

  _slideDown() {
    this.el.addClass('active');
    this.body.css('maxHeight', this.height);
    this.body.css('opacity', 1);
  }

  _togglePanel() {
    if (this.initialised) {
      this.body.addClass('animatable');
    }

    if (this.active) {
      this._slideUp();
    } else {
      this._slideDown();
    }
    this.active = !this.active;
  }

  _calculateHeight() {
    requestAnimationFrame(() => {
      this.height = this.body.height() + 12; // giving a little bit of room (not sure why its needed but it seems to be)

      if (!this.active) {
        this.body.css('maxHeight', 0);
        this.body.css('opacity', 0);
      }

      this.active = !this.active;
      this._togglePanel();
      this.initialised = true;
    });
  }

  _addEvents() {
    this.cta.on('click', this._togglePanel);
    this.body.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
       this.body.removeClass('animatable');
    });
  }

  constructor(el) {
    this.el = $(el);
    this.active = this.el.hasClass('active');
    this.initialised = false;

    this._addEvents = this._addEvents.bind(this);
    this._togglePanel = this._togglePanel.bind(this);

    this.cta = this.el.find('.panel-cta');
    this.body = this.el.find('.panel-body');
    
    this._calculateHeight();
    this._addEvents();
  }
}

export default Panel;
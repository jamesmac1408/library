class Panel {
  _slideUp() {
    this.cta.removeClass('active');
    this.body.addClass('animatable');
    this.body.css('maxHeight', 0);
    this.body.css('opacity', 0);
  }

  _slideDown() {
    this.cta.addClass('active');
    this.body.addClass('animatable');
    this.body.css('maxHeight', this.height);
    this.body.css('opacity', 1);
  }

  _togglePanel(index) {
    if (this.active) {
      this._slideUp();
    } else {
      this._slideDown();
    }
    this.active = !this.active;
  }

  _calculateHeight() {
    this.height = this.body.height();
    this.body.css('maxHeight', 0);
    this.body.css('opacity', 0);
  }

  _addEvents() {
    this.cta.on('click', this._togglePanel);
    var self = this;
    this.body.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
       self.body.removeClass('animatable');
    });
  }

  constructor(el) {
    this.el = $(el);
    this.active = false;

    this._addEvents = this._addEvents.bind(this);
    this._togglePanel = this._togglePanel.bind(this);

    this.cta = this.el.find('.panel-cta');
    this.body = this.el.find('.panel-body');
    
    this._calculateHeight();
    this._addEvents();
  }
}

export default Panel;
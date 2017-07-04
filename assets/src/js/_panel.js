function PanelController(el) {
  this.el = $(el);
  this.active = false;

  this._slideUp = function() {
    this.cta.removeClass('active');
    this.body.addClass('animatable');
    this.body.css('maxHeight', 0);
    this.body.css('opacity', 0);
  }

  this._slideDown = function() {
    this.cta.addClass('active');
    this.body.addClass('animatable');
    this.body.css('maxHeight', this.height);
    this.body.css('opacity', 1);
  }

  this._togglePanel = function(index) {
    if (this.active) {
      this._slideUp();
    } else {
      this._slideDown();
    }
    this.active = !this.active;
  }

  this._calculateHeight = function() {
    this.height = this.body.height();
    this.body.css('maxHeight', 0);
    this.body.css('opacity', 0);
  }

  this._addEvents = function() {
    this.cta.on('click', this._togglePanel);
    var self = this;
    this.body.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
       self.body.removeClass('animatable');
    });
  }

  this.init = function() {
    this._addEvents = this._addEvents.bind(this);
    this._togglePanel = this._togglePanel.bind(this);

    this.cta = this.el.find('.panel-cta');
    this.body = this.el.find('.panel-body');
    
    this._calculateHeight();
    this._addEvents();
  }

  this.init();
}
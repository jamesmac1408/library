import doScrolling from './_smooth-scrolling';

class ScrollManager {


  addHandler(handler) {
    this.handlers.push(handler);
  }

  scrollTo(target, duration) {
    doScrolling(this.scrollTarget, target, duration);
  }

  _fireHandlers() {
    for (let handler of this.handlers) {
      handler(this.latestKnownScrollY);
    }
    this.ticking = false;
  }

  _requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => { this._fireHandlers(); });
    }
    this.ticking = true;
  }

  _onScroll(scrollTop) {
    this.latestKnownScrollY = scrollTop;
	  this._requestTick();
  }

  _addEvents() {
    document.body.addEventListener('scroll', (e) => {
      this._onScroll(document.body.scrollTop);
    });
    if (this.scrollTarget !== document.body) {
      this.scrollTarget.addEventListener('scroll', (e) => {
        this._onScroll(this.scrollTarget.scrollTop);
      });
    }
    window.addEventListener('resize', this._onScroll);
    window.addEventListener('hashchange', this._onScroll);
  }

  constructor(scrollTarget, ...handlers) {
    this.scrollTarget = scrollTarget;
    this.handlers = handlers;
    this.ticking = false;

    this._onScroll = this._onScroll.bind(this);

    this._addEvents();
  }
}

export default ScrollManager;
class ScrollManager {

  get main() {
    return document.querySelector('.main');
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  _onScroll(scrollTop) {
    for (let handler of this.handlers) {
      handler(scrollTop);
    }
  }

  _addEvents() {
    document.body.addEventListener('scroll', () => {
      this._onScroll(document.body.scrollTop);
    });
    this.main.addEventListener('scroll', () => {
      this._onScroll(main.scrollTop);
    });
    window.addEventListener('resize', this._onScroll);
    window.addEventListener('hashchange', this._onScroll);
  }

  constructor(handlers = []) {
    this.handlers = handlers;
    this._addEvents();
  }
}

export default ScrollManager;
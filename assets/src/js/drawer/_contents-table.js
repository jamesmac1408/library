// THIS CODE HAS GOTTEN MESSY, I KNOW
// TODO: Clean up

import { IN_VIEW_THRESHOLD } from '../_constants';

class TableOfContents {
  _highlightTitles(scrollTop) {
    var furthestTitle = 0;
    for (var i = 0; i < this.titles.length; i++) {
      var rect = this.titles[i].getBoundingClientRect();
      if (rect.top < IN_VIEW_THRESHOLD) {
        furthestTitle = i;
        this.links[i].classList.add('active');
      } else {
        this.links[i].classList.remove('active');
      }
    }
    this._updateScrollIndicator(scrollTop, furthestTitle);
  }

  _updateScrollIndicator(scrollTop, furthestTitle) {
    if (this.titles[furthestTitle]) {

      this.furthestTitle = furthestTitle;

      var currElementDistance = null;
      var nextElementDistance = null;

      var currTitleOffsetTop = this.titles[furthestTitle].offsetTop;

      if (furthestTitle === (this.titles.length - 1)) {
        var componentOffsetBottom = (this.component.offsetTop + this.component.offsetHeight) ;

        this.nextElementDistance = componentOffsetBottom;
        this.currElementDistance = currTitleOffsetTop;

      } else {
        var nextTitleOffsetTop = this.titles[furthestTitle + 1].offsetTop;

        this.nextElementDistance = nextTitleOffsetTop;
        this.currElementDistance = currTitleOffsetTop;
      }
    }

    const goal = this.nextElementDistance - this.currElementDistance;
    let distance = goal - (this.nextElementDistance - scrollTop - IN_VIEW_THRESHOLD);
    distance = (distance > goal) ? goal : distance;

    var percentage = (distance / goal),
        extraHeight = (33 * percentage),
        height = (33 * (furthestTitle)) + extraHeight;

    this.scrollIndicator.style.height = height + 'px';
  }

  initialiseMaxHeight() {
    var self = this;

    this.parent.style.display = 'block';
    this.toc.style.maxHeight = 'none';
    this.maxHeight = this.toc.offsetHeight + 12 + 'px';

    requestAnimationFrame(function() {
      if (!self.active) {
        self.toc.style.maxHeight = '0px';
        self.toc.style.opacity = 0;
      }
    })
  }

  update(scrollTop) {
    // if (active) {
      if (!this.active) {
        console.log('here');
        this.active = true;
        this.toc.classList.add('animatable');
        this.body.classList.add('active');
        this.toc.style.maxHeight = this.maxHeight;
        this.toc.style.opacity = 1;
      }
      this._highlightTitles(scrollTop);
    // } 
    // else if (this.active) {
    //     console.log('here 2')
    //     this.active = false;
    //     this.toc.style.maxHeight = '0px';
    //     this.toc.style.opacity = 0;
    //     this.scrollIndicator.style.height = '0px';
    //     this.body.classList.remove('active');
    // }
  }

  getComponent() {
    return this.component;
  }

  _scrollToTitle(index) {
    doScrolling(this.titles[index], 300);
  }

  _addEvents() {
    var self = this;
    for (var i = 0; i < this.links.length; i += 1) {
        self.links[i].addEventListener('click', this._scrollToTitle.bind(null, i));
    }
  }

  constructor(el) {
    this.base = el;
    this.furthestTitle = null;
    this.active = false;

    this._scrollToTitle = this._scrollToTitle.bind(this);

    this.component = document.querySelector('.component');
    this.body = document.getElementById(this.base + '-nav');
    this.scrollIndicator = this.body.querySelector('.scrollIndicator');
    this.toc = this.body.querySelector('.toc');

    console.log(this.body);

    var el = this.body;
    while ((el = el.parentElement) && !el.classList.contains('content-section'));
    this.parent = el;

    if (!this.component) {
      return;
    }

    this.initialiseMaxHeight();
    
    this.titles = [];
    this.links = this.body.querySelectorAll('a');
    this.titles.push(this.component.querySelector('.component-title'));
    for (var i = 1; i < this.links.length; i++) {
      // this makes me feel ill but is necessary, sorry
      var id = /.*#(.*)/.exec(this.links[i].getAttribute('href'))[1].replace('+', '\\+')
      this.titles.push(this.component.querySelector('#' + id));
    }

    this._addEvents();
  }
}

export default TableOfContents;
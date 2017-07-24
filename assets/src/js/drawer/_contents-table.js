import ScrollManager from '../_scroll-manager';
import { IN_VIEW_THRESHOLD } from '../_constants';

class TableOfContents {
  _highlightTitles(scrollTop) {
    console.log(scrollTop);
    var furthestTitle = 0;
    for (var i = 0; i < this.titles.length; i++) {
      var top = this.titles[i].offsetTop;
      if (scrollTop >= (top - this.offsetInViewThreshold)) {
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

      if (furthestTitle === (this.titles.length - 1)) {
        // if we're at at the list title in the contents table, set the next distance 
        // to the bottom of the content body
        this.nextElementDistance = (this.component.offsetTop + this.component.offsetHeight) - this.offsetInViewThreshold
      } else {
        // else, set the next distance to the next title
        this.nextElementDistance = this.titles[furthestTitle + 1].offsetTop - this.offsetInViewThreshold
      }

      // declare current element distance and clamp it >= 0
      this.currElementDistance = furthestTitle > 0 ? this.titles[furthestTitle].offsetTop - this.offsetInViewThreshold : 0;
    }

    // work out the distance scrolled
    const distance = scrollTop - this.currElementDistance;

    // work this out as a percentage of the distance between the current and next element distance
    let percentageDistanceTravelled = distance / (this.nextElementDistance - this.currElementDistance);
    percentageDistanceTravelled = (percentageDistanceTravelled > 1) ? 1 : percentageDistanceTravelled;

    // work out height of the bar accordingly
    var extraHeight = (this.heightMultiplier * percentageDistanceTravelled),
        height = (this.heightMultiplier * (furthestTitle)) + extraHeight;

    this.scrollIndicator.style.height = height + 'px';
  }

  initialiseMaxHeight() {
    this.maxHeight = this.toc.offsetHeight + 'px';
    this.heightMultiplier = this.links[0].getBoundingClientRect().height;
  }

  getComponent() {
    return this.component;
  }

  _scrollToTitle(index) {
    this.scrollManager.scrollTo(this.titles[index], 300);
  }

  _addEvents() {
    this.scrollManager = new ScrollManager(document.querySelector('.page-container'), this._highlightTitles);

    var self = this;
    for (var i = 0; i < this.links.length; i += 1) {
      (function() {
        var k = i;
        self.links[k].addEventListener('click', (e) => {
          self._scrollToTitle(k);
          e.preventDefault();
        });
      }());
    }
  }

  constructor(el) {
    this.body = el;
    this.offsetInViewThreshold = IN_VIEW_THRESHOLD - document.querySelector('.main').offsetTop;
    this.component = document.querySelector('.component');
    this.scrollIndicator = this.body.querySelector('.scrollIndicator');
    this.toc = this.body.querySelector('.toc');

    this._scrollToTitle = this._scrollToTitle.bind(this);
    this._highlightTitles = this._highlightTitles.bind(this);

    this.furthestTitle = null;

    this.titles = [this.component.querySelector('.component-title')];
    this.links = this.body.querySelectorAll('a');
    for (var i = 1; i < this.links.length; i++) {
      var id = /.*#(.*)/.exec(this.links[i].getAttribute('href'))[1].replace('+', '\\+')
      this.titles = [...this.titles, this.component.querySelector('#' + id)];
    }
    
    this.initialiseMaxHeight();
    this._addEvents();
    this._highlightTitles(0);
  }
}

export default TableOfContents;
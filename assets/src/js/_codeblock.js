/*
  ============ Code Block ============
*/

import Clipboard from './_clipboard';

class CodeBlock {

  _initialiseClipboard() {
    var self = this;
    this.clipboard = new Clipboard(this.btn, {
        text: function(trigger) {
          return self.body.innerText
        }
      }
    );
  }

  _addEventListeners() {
    this.clipboard.on('success', function(e) {
        el.querySelector('.demo-code--copy').classList.add('success');
        setTimeout(function(){
            el.querySelector('.demo-code--copy').classList.remove('success');
        }, 1500);
    });

    this.clipboard.on('error', function(e) {
        throw new Error(e);
    });
  }

  constructor(el) {
    this.body = el;
    this.btn = el.querySelector('.demo-code--copy');

    this._initialiseClipboard();
    this._addEventListeners();
  }
}

export default CodeBlock;

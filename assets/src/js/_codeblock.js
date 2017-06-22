/*
  ============ Code Block ============
*/

function CodeBlock(el) {
  this.body = el;
  this.btn = el.querySelector('.demo-code--copy');

  this._addEventListeners = function() {

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

  this._init = function() {
    var self = this;
    this.clipboard = new Clipboard(this.btn, {
        text: function(trigger) {
          return self.body.innerText
        }
      }
    );

    this._addEventListeners();
  }

  this._init();
}

function Drawer(el) {
  this.drawerContainer = el;
  this.drawer = el.querySelector('.drawer');
  this.active = false;

  this.toggle = function() {
    if (this.active) {
      this._hideDrawer();
    } else {
      this._showDrawer();
    }
  }

  this._showDrawer = function() {
    this.active = true;
    this.drawerContainer.classList.add('in');
    var self = this;
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        self.drawerContainer.classList.add('active');
        document.body.addEventListener('touchend', self._onBodyClick);
      });
    });
  }

  this._removeDrawer = function() {
    this.drawerContainer.removeEventListener('transitionend', this._removeDrawer);
    this.active = false;
    this.drawerContainer.classList.remove('in');
  }

  this._hideDrawer = function() {
    document.body.removeEventListener('touchend', this._onBodyClick);
    this.drawerContainer.classList.remove('active');
    this.drawerContainer.addEventListener('transitionend', this._removeDrawer);
  }

  this._onBodyClick = function(evt) {
    if (!this.active) {
      return;
    }

    if (!this.drawer.contains(evt.target)) {
      this._hideDrawer();
    }
  }


  this._init = function() {
    this._onBodyClick = this._onBodyClick.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);
  }

  this._init();
}

function CodeBlock(el) {
  this.body = el;
  this.btn = el.querySelector('.demo-code--copy');

  this._addEventListeners = function() {

    this.clipboard.on('success', function(e) {
        // console.log(e);
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

var headerIcon = document.getElementById('headerIcon');
var drawer = new Drawer(document.getElementById('drawerContainer'));
headerIcon.addEventListener('click', function() {
  drawer.toggle();
});

var codeBlocks = document.querySelectorAll('.demo-code');
for (var i = 0; i < codeBlocks.length; i += 1) {
  new CodeBlock(codeBlocks[i]);
}


/*
  ============ Initialisation ============
*/

var headerIcon = document.getElementById('headerIcon');
var drawer = new Drawer(document.getElementById('drawerContainer'));
headerIcon.addEventListener('click', function() {
  drawer.toggle();
});

var codeBlocks = document.querySelectorAll('.demo-code');
for (var i = 0; i < codeBlocks.length; i += 1) {
  new CodeBlock(codeBlocks[i]);
}

var panels = document.querySelectorAll('.panel-container');
for (var i = 0; i < panels.length; i += 1) {
  new PanelController(panels[i]);
}

var tabs = document.querySelectorAll('.tabs-container');
for (var i = 0; i < tabs.length; i += 1) {
  new TabController(tabs[i]);
}


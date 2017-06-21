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

window.addEventListener('hashchange', function(evt) {
  console.log('ash change');
})

var headerIcon = document.getElementById('headerIcon');
var drawerContainer = document.getElementById('drawerContainer');
var drawer = drawerContainer.querySelector('.drawer');

headerIcon.addEventListener('click', function() {
  if (drawerContainer.classList.contains('active')) {
    hideDrawer();
  } else {
    showDrawer();
  }
});

function showDrawer() {
  drawerContainer.classList.add('in');
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      drawerContainer.classList.add('active');
    });
  });
  drawerContainer.addEventListener('transitionend', addBodyListener);
}

function hideDrawer() {
  document.body.removeEventListener('click', onBodyClick);
  drawerContainer.classList.remove('active');
  drawerContainer.addEventListener('transitionend', removeDrawer);
}

function removeDrawer() {
  drawerContainer.removeEventListener('transitionend', removeDrawer);
  drawerContainer.classList.remove('in');
}

function addBodyListener() {
  drawerContainer.removeEventListener('transitionend', addBodyListener);
  document.body.addEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (!drawer.contains(evt.target)) {
      hideDrawer();
    }
}
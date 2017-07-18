/*
  ============ Initialisation ============
*/

import Drawer from './drawer/_drawer';
import CodeBlock from './_codeblock';
import Panel from './_panel';
import Tabs from './_tabs';

$( document ).ready(function() {
  const codeBlocks = document.querySelectorAll('.demo-code');
  for (let i = 0; i < codeBlocks.length; i += 1) {
    new CodeBlock(codeBlocks[i]);
  }

  const panels = document.querySelectorAll('.panel-container');
  for (let i = 0; i < panels.length; i += 1) {
    new Panel(panels[i]);
  }

  const tabs = document.querySelectorAll('.tabs-container');
  for (let i = 0; i < tabs.length; i += 1) {
    new Tabs(tabs[i]);
  }

  const headerIcon = document.getElementById('headerIcon');
  const drawer = new Drawer(document.getElementById('drawerContainer'));
  headerIcon.addEventListener('click', function() {
    drawer.toggle();
  });
});


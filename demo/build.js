'use strict';

const fs = require('fs')
const path = require('path')
const fm = require('front-matter');

const componentDirs = fs.readdirSync('components').filter((f) => fs.statSync(path.join('components', f)).isDirectory());

const header = fs.readFileSync(path.join('demo', 'partials', 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join('demo', 'partials', 'footer.html'), 'utf8');

let html = header;

for (let dir of componentDirs) {
  const demoObj = fm(fs.readFileSync(path.join('components', dir, 'demo', 'index.html'), 'utf8'));
  // TODO: Use YAML or something similar to get component name/attributes
  html += `
    <h2 class="component-title">${demoObj.attributes.name}</h2>
    <div class="demo-container">
  `
  html += demoObj.body;
  console.log(demoObj)
  html += `</div>`;
}

html += footer;

fs.writeFileSync('index.html', html, 'utf8');

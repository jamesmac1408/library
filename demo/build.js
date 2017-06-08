const fs = require('fs')
const path = require('path')

const componentDirs = fs.readdirSync('components').filter((f) => fs.statSync(path.join('components', f)).isDirectory());

const header = fs.readFileSync(path.join('demo', 'partials', 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join('demo', 'partials', 'header.html'), 'utf8');

let html = header;

for (let dir of componentDirs) {
  const demoHTML = fs.readFileSync(path.join('components', dir, 'demo', 'index.html'), 'utf8');
  html += demoHTML;
}

html += footer;

fs.writeFileSync('index.html', html, 'utf8');

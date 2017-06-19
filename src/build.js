'use strict';

const fs = require('fs');
const path = require('path');
const escape = require('escape-html');

// Components
const componentDirs = fs.readdirSync('components').filter((f) => fs.statSync(path.join('components', f)).isDirectory());

// Partials
const header = fs.readFileSync(path.join('demo', 'partials', 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join('demo', 'partials', 'footer.html'), 'utf8');

// HTML to return
let html = header;

// For each component
for (let dir of componentDirs) {

    // Check for yaml file
    const jsonpath = path.join('components', dir, 'demo', 'demo.txt');
    
    if (fs.existsSync(jsonpath)) {

        // Parse yaml file
        const text = fs.readFileSync(jsonpath, 'utf8').toString();

        // Component name
        let name = /\"name\":\s"(.*)"/gm.exec(text);
        if (name && name.length > 0) {
            name = name[1];
        } else {
            name = "undefined";
        }

        // Component description
        let description = /\"description\":\s"(.*)"/gm.exec(text);
        if (description && description.length > 0) {
            description = description[1];
        } else {
            description = "undefined";
        }

        // Component demo
        let demos = text.split('"demo":');
        
        // Remove first blank
        demos.splice(0, 1);

        html += `<h2 class="component-title">${name}</h2>
                     <div class="demo">`;

        for (let i = 0; i < demos.length; i += 1) {

            let split = demos[i].split('"code":'); 

            html += `
                <div class="demo-container">
                    <div class="demo-output">${split[0]}</div>
                    <div class="demo-code"><pre><code class="hljs cs">${escape(split[1])}</code></pre></div>
                </div>
            `;

        }
       
        html += `</div>`;

    } else {
        console.error('No demo YAML file found ' + jsonpath);
    }
}

// Add footer partial
html += footer;

// Write out file
fs.writeFileSync('index.html', html, 'utf8');
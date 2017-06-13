# SD Material Components 

**Run `npm install` on initial install**

- Each component contained in a seperate folder within 'components/'
- 2 sub-folders: JS & SASS containing the component.js and component.scss for that component
- README.md: each component contains a README.md file which details how to use the component 
- Demo folder containing demo.txt, and demo.js & demo.scss if required.

## Folder structure for each component
```
components/
├── COMPONENT_NAME/ 
│   ├── demo/
│   |   ├── demo.txt
|   |   └── demo.scss
|   ├── js/
|   |   └── component.js
|   ├── scss/
|   |   └── component.scss
└── └── README.md
```

## Current features

- Minified JS
- Autoprefixed + minified CSS

## TODO

- YAML/front-matter for components (title, attributes etc.)
- Seperate, more detailed demo pages for each component
- Polyfills (big TODO)
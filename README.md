# SD Material Components 

**Run `npm install` on initial install**

- Each component contained in a seperate folder within 'components/'
- 2 sub-folders: JS & SASS containing the component.js and component.scss for that component
- README.md: each component contains a README.md file which details how to use the component 
- Demo folder containing demo.txt, and demo.js & demo.scss if required.

** Include
```
* TOC
{:toc}
```
at the start of all demo.md files to get a contents section in the left hand nav**

## Folder structure for each component

```
components/
├── COMPONENT_NAME/ 
│   ├── demo-assets/
|   |   └── demo.scss
|   |   └── demo.js
|   ├── js/
|   |   └── scripts.js (main component js)
|   |   └── *.js (any other js required for component)
|   ├── scss/
|   |   └── styles.scss
└── └── demo.md
```

## Current features

- Minified JS
- Autoprefixed + minified CSS
- Navigation/contents drawer

## TODO

- Polyfills (big TODO).
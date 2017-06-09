class ComponentDemo extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(ComponentDemo.template.cloneNode(true));
    let root = this.shadowRoot;
  }

  connectedCallback() {
    // hacky but I can't find another way of doing this yet
    const demoCode = this.querySelector('[slot=code]').innerHTML;
    const code = this.shadowRoot.querySelector('code');
    code.innerHTML = demoCode.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    hljs.highlightBlock(code);
  }


  static get highlightStyles() {
    return '.hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta-keyword,.hljs-name,.hljs-selector-tag,.hljs-strong{font-weight:700}.hljs{display:block;overflow-x:auto;padding:.5em;background:#F0F0F0}.hljs,.hljs-subst{color:#444}.hljs-comment{color:#888}.hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{color:#800}.hljs-section,.hljs-title{color:#800;font-weight:700}.hljs-link,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#BC6060}.hljs-literal{color:#78A960}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta-string{color:#4d99bf}.hljs-emphasis{font-style:italic}'
  }

  static get template() {
    if (this.fragment) { return this.fragment; }

    const fragment = document.createDocumentFragment();
    let styles = document.createElement('style');
    styles.innerHTML = `
      :host {
        display: block;
        margin: 16px 0;
      }
      .demo-container {
        border-radius: 4px;
        border: 1px solid #e0e6ed;
      }
      .demo-output {
        padding: 16px;
        border-bottom: 1px solid #e0e6ed;
        overflow-x: hidden;
      }
      .demo-code pre {
        white-space: pre;
        margin: 0;
        padding: 0;
      }
      .demo-code pre code {
        background: rgba(224, 230, 237, 0.25);
      }
    `
    styles.innerHTML += ComponentDemo.highlightStyles;

    let content = document.createElement('div');
    content.classList.add('demo-container');
    content.innerHTML = `
      <div class="demo-output">
        <slot name="output"></slot>
      </div>
      <div class="demo-code">
        <pre><code></code></pre>
      </div>
    ` 

    fragment.appendChild(styles);
    fragment.appendChild(content);

    this.fragment = fragment;

    return fragment;
  }
}

customElements.define('component-demo', ComponentDemo);
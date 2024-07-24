import css from "../assets/index.css" with { type: 'css' };
import terminalConfig from "../config/terminalConfig.json" with { type: "json" };
import { TemplateLoader } from "./TemplateLoader.js";
import { Terminal } from "./Terminal.js";

class TerminalElement extends HTMLElement {
  static get observedAttributes() {
    return ["config"];
  }
  constructor() {
    super();
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = await TemplateLoader.load('terminal-template.html');
    shadow.adoptedStyleSheets = [css];

    const terminalConfigPath = this.getAttribute('config') ?? null;
    if (terminalConfigPath !== null){
      import(terminalConfigPath, {with: {type: 'json'}}).then(configLoaded => {
        new Terminal(shadow, configLoaded.default);
      });
    } else {
      new Terminal(shadow, terminalConfig);
    }

    document.head.innerHTML = '<link rel="stylesheet" href="../assets/index.css" />';
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("cmd-terminal", TerminalElement);
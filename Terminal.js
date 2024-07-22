import terminalConfig from "./terminalConfig.json" with { type: "json" };

class Terminal {
  /** @type {HTMLElement} */
  terminalElt = null;
  /** @type {HTMLElement} history */
  historyElt = null;
  /** @type {HTMLElement} input */
  input = null;
  /** @type {terminalConfig} config */
  config = null;

  constructor(TerminalElementContent, config = null) {
    this.config = config ?? terminalConfig;
    
    TerminalElementContent.querySelector('.prefix').innerText = this.config.prefix;
    this.terminalElt = TerminalElementContent.querySelector("#terminal");
    this.historyElt = TerminalElementContent.querySelector("#promt-history");

    this.input = TerminalElementContent.querySelector("#terminal-input");
    this.input.addEventListener("keyup", ({ key }) => {
      if (key === "Enter" && this.input.value !== "") {
        this.executeCommand(this.input.value);
      }
    });
  }

  executeCommand(command) {
    this.input.value = "";
    this.addToHistory(command);
    this.input.scrollIntoView();
  }

  addToHistory(command) {
    let span = document.createElement("span");
    span.className = "promt-text";
    span.innerText = this.config.prefix + command;

    this.historyElt.appendChild(span);
  }
}

import css from "./index.css" with { type: 'css' };
import { templateRender } from "./terminal-template.js";

class TerminalElement extends HTMLElement {
  static get observedAttributes() {
    return ["config"];
  }
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = templateRender();
    shadow.adoptedStyleSheets = [css];

    const terminalConfigPath = this.getAttribute('config') ?? null;
    console.log(terminalConfigPath);
    if (terminalConfigPath !== null){
      import(terminalConfigPath, {with: {type: 'json'}}).then(configLoaded => {
        new Terminal(shadow, configLoaded.default);
      });
    } else {
      new Terminal(shadow, terminalConfig);
    }
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

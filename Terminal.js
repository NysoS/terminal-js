import terminalConfig from "./terminalCondig.json" with { type: "json" };

export default class Terminal {
  /** @type {HTMLElement} */
  terminalElt = null;
  /** @type {HTMLElement} history */
  historyElt = null;
  /** @type {HTMLElement} input */
  input = null;

  /** @type {terminalConfig} config */
  config = null;

  constructor(config) {
    this.config = config ?? terminalConfig;
    document.querySelector('.prefix').innerText = terminalConfig.prefix;
    this.terminalElt = document.querySelector("#terminal");
    this.historyElt = document.querySelector("#promt-history");

    this.input = document.querySelector("#terminal-input");
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

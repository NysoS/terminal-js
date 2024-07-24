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

    TerminalElementContent.querySelector(".prefix").innerText =
      this.config.prefix;
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

export { Terminal };

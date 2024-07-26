import { CommandRegister } from "./CommandRegister.js";

class CommandInvoker {
  constructor() {}

  /** @param {string} commandLine */
  invoke(commandLine) {
    this.#commandParser(commandLine);
  }

  /** @param {string} */
  #commandParser(commandLine) {
    let commandKey = "";
    let args = [];

    if (commandLine.includes("-")) {
      let commandSplit = commandLine.split("-");
      commandKey = commandSplit[0].trim();
      args = commandSplit.slice(1, commandSplit.length);
    } else {
      commandKey = commandLine.trim();
    }

    const result = CommandRegister.invoke(commandKey, args);
    console.log(result);
  }
}

export { CommandInvoker };

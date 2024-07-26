class CommandRegister {
  static #commands = new Map();

  constructor() {}

  /**
   *
   * @param {string} commandLine
   * @param {Class} command
   */
  static addCommand(commandLine, command) {
    this.#commands.set(commandLine, command);
  }

  static invoke(commandLine, args) {
    if (!this.#commands.has(commandLine)) {
      return null;
    }

    let command = this.#commands.get(commandLine);
    if (command) {
      return command.execute(args);
    }
  }
}

export { CommandRegister };

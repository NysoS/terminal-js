import { ICommand } from "./ICommand.js";

const HELP_COMMAND_LINE = "help";

class HelpCommand extends ICommand {
  _config = {
    command_line: "help",
    args: {
      a: this.showCommandList(),
      all: this.showCommandList(),
    },
  };

  constructor() {
    super();
    console.log(this._config);
  }

  execute(args) {
    super.execute(args);
  }

  showCommandList() {
    console.log("this is all list of commands");
  }
}

export { HELP_COMMAND_LINE, HelpCommand };

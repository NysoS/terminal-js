import { CommandRegister } from "./CommandRegister.js";
import { HELP_COMMAND_LINE, HelpCommand } from "./Commands/HelpCommand.js";

CommandRegister.addCommand(HELP_COMMAND_LINE, new HelpCommand());

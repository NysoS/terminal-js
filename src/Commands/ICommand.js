import commandConfig from '../../config/comandSchema.json' with { type: 'json' };

class ICommand {
  _config = null;
  constructor() {
     this._config = commandConfig[this.constructor.name];
  }

  execute(args) {
    console.log("execute of ICommand");

    for(let arg in args) {
      console.log(this._config.args[arg]);
    }
  }
}

export { ICommand };


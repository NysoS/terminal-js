import { CURRENT_DIR } from "../global.js";

const TEMPLATE_FOLDER_PATH = `${CURRENT_DIR}template/`;

class TemplateLoader {
  static async load(file) {
    const result = await fetch(`${TEMPLATE_FOLDER_PATH}${file}`);

    return result.text();
  }
}

export { TemplateLoader };

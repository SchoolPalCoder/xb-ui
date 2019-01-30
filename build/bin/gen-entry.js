const fs = require("fs");
const path = require("path");
const os = require("os");
const pkg = require("../../package.json");
const utils = require("../utils");

const componentNames = utils.readDirSync(path.resolve(process.cwd(), "./packages"), /^xb-(([a-z]|-)+$)/);

const endOfLine = os.EOL;
const OUTPUT_PATH = path.join(__dirname, "../../src/index.ts");
const IMPORT_TEMPLATE = 'import {{name}} from "@/{{package}}/index.ts";';
const INSTALL_COMPONENT_TEMPLATE = "  {{name}}";
const MAIN_TEMPLATE = `/*
* 此代码由构建工具自动生成，请勿修改此部分代码
* 工具： '../build/bin/build-entry.js'
*/

import Vue, { VueConstructor, PluginFunction } from "vue";
import locale from "src/locale";
{{include}}

const components = {
{{install}},
};

const install: PluginFunction<any> = (vue: VueConstructor<Vue>, options: any = {}) => {
  locale.use(options.locale);
  locale.i18n(options.i18n);

  Object.keys(components).forEach((component) => {
    vue.component(component, components[component]);
  });

  vue.prototype.$XBUI = {
    size: options.size || "",
    transfer: "transfer" in options ? options.transfer : "",
  };

  vue.prototype.$Message = XbMessageTips;
};

module.exports = {
  version: "{{version}}",
  locale: locale.use,
  i18n: locale.i18n,
  install,
  lang: (code) => {
    const langObject = window["xbui/locale"].default;
    if (code === langObject.i.locale) {
      locale.use(langObject);
    } else {
      // tslint:disable-next-line:no-console
      console.log(\`The \${code} language pack is not loaded.\`);
    }
  },
{{list}}
};

module.exports.default = module.exports;
`;

const includeComponentTemplate = [];
const installTemplate = [];
const listTemplate = [];

componentNames.forEach((name) => {
  const componentName = utils.upperCamelCase(name);

  includeComponentTemplate.push(
    utils.stringReplace(IMPORT_TEMPLATE, {
      name: componentName,
      package: name,
    })
  );

  if (["Loading", "MessageBox", "Notification", "Message"].indexOf(componentName) === -1) {
    installTemplate.push(
      utils.stringReplace(INSTALL_COMPONENT_TEMPLATE, {
        name: componentName,
        component: name,
      })
    );
  }

  if (componentName !== "Loading") {
    listTemplate.push(`  ${componentName}`);
  }
});

const template = utils.stringReplace(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join("," + endOfLine),
  version: pkg.version,
  list: listTemplate.join("," + endOfLine),
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log("[build entry] DONE:", OUTPUT_PATH);

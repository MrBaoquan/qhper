/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */
console.warn("ext install.js");
module.exports = function (api) {
    api.render("./templates", {
        prompts: api.prompts,
    });
};

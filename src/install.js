/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */
var fs = require('fs');

module.exports = function (api) {
    api.render("./templates", {
        prompts: api.prompts,
    });
    api.renderFile('./templates/.env','.env',{
        prompts:api.prompts
    });
    api.renderFile('./templates/.env.development','.env.development',{
        prompts:api.prompts
    });
    api.renderFile('./templates/.env.production','.env.production',{
        prompts:api.prompts
    });
};

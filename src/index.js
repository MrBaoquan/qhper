/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const path = require('path');

const extendWithComponent = (conf) => {
    conf.boot.push('~@mrbaoquan/quasar-app-extension-qhper/src/boot/index.js');
    conf.boot.push('qhper');
    
    Object.assign(conf.build.env,
            require('dotenv').config({path:'.env'}).parsed,
            require('dotenv').config({path:`.env.${process.env.NODE_ENV}`}).parsed
        );

    const requiredPlugins = [
        'Loading',
        'Notify',
        'Dialog',
        'Cookies',
        'LocalStorage',
    ];
    requiredPlugins.forEach((_plugin) => {
        if (!conf.framework.plugins.includes(_plugin)) {
            conf.framework.plugins.push(_plugin);
        }
    });
};

const chainWebpack = (ctx, chain) => {
    chain.resolve.alias.set('qhper', path.resolve(__dirname, './core'));
};

module.exports = function (api) {
    //
    api.chainWebpack((chain) => chainWebpack(api.ctx, chain));
    api.extendQuasarConf(extendWithComponent);
    console.log('@mrbaoquan/qhper started...');
};

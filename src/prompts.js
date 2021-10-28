/**
 * Quasar App Extension prompts script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/prompts-api
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
 * Example:

  return [
    {
      name: 'name',
      type: 'input',
      required: true,
      message: 'Quasar CLI Extension name (without prefix)',
    },
    {
      name: 'preset',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [
        {
          name: 'Install script',
          value: 'install'
        },
        {
          name: 'Prompts script',
          value: 'prompts'
        },
        {
          name: 'Uninstall script',
          value: 'uninstall'
        }
      ]
    }
  ]

 */

module.exports = function () {
    return [
        {
            name: "apiServer",
            type: "input",
            required: true,
            message: "URL of API server",
            default: "http://quasarapp.com",
        },
        {
            name: "authWxmpRoute",
            type: "input",
            require: false,
            message: "Auth wechat media platform redirect route",
            default: "/proxy/auth/wxmp",
        },
        {
            name: "fetchUserRoute",
            type: "input",
            required: true,
            message: "Route to fetch authenticated user",
            default: "/api/auth/user",
        },
    ];
};

const path = require('path')

const abspath = (app) => path.resolve(path.join(__dirname, app))

function genCommands(cmnd, files, passFilesAsArgs = false) {
  const filesByApp = require('./package.json')._apps
    .reduce((apps, app) => ({ ...apps, [abspath(app)]: new Set() }))

  for (const file of files) {
    for (const app in apps) {
      if (file.startsWith(app)) {
        apps[app].add(file)
      }
    }
  }

  return Object.entries(filesByApp)
    .filter(([_app, files]) => files.size)
    .map(([app, files]) => `${cmnd.replace('{dir}', app)}${
      passFilesAsArgs ? ' '+files.join(' ') : ''
    }`)
}

// prettier-ignore
module.exports = {
  '*.{ts,tsx}': filenames => genCommands('yarn --cwd {dir} typecheck', filenames, false),
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --cache --fix',
    filenames => genCommands('yarn --cwd {dir} test', filenames, true),
  ],
  '*.{json,md,mdx,yml,css}': [
    'prettier --write'
  ],
}

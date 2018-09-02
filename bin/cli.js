#! /usr/bin/env node
const shell = require('shelljs')

const commands = {
  serve: 'serve.js',
  render: 'render.js'
}

const command = commands[process.argv[2]]
if (!command) {
  console.error('Unrecognized command!')
  process.exit(1)
}

const result = require(`${__dirname}/${command}`)

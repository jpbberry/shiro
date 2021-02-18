const Master = require('discord-rose/master')
const config = require('../config.json')

const master = new Master(require('path').resolve(__dirname, './worker.js'), {
  token: config.token,
  shardsPerCluster: 9,
  cache: { // disable all defaults except for guilds
    roles: false,
    channels: false,
    self: false
  },
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  cacheControl: {
    guilds: [] // only need ID for guild count, no props
  }
})

master.start()

const Worker = require('discord-rose/worker')
const shiro = require('@jaguar_avi/shiro.gg-wrapper')

const worker = new Worker()

worker.commands
  .options({
    default: {
      image: true
    }
  })
  .setPrefix('shiro')
  .middleware(async (ctx) => {
    if (!ctx.command.image) return true
    if (ctx.command.nsfw && !ctx.channel.nsfw) throw new Error('You must be in an NSFW channel to use this command.')

    const image = await shiro[ctx.command.nsfw ? 'nsfw' : 'sfw'](ctx.command.command)

    ctx.embed
      .image(image)
      .send()

    return false
  })
  .add({
    command: 'avatars'
  })
  .add({
    command: 'blush'
  })
  .add({
    command: 'cry'
  })
  .add({
    command: 'hug'
  })
  .add({
    command: 'kiss'
  })
  .add({
    command: 'neko'
  })
  .add({
    command: 'nom'
  })
  .add({
    command: 'pat'
  })
  .add({
    command: 'poke'
  })
  .add({
    command: 'pout'
  })
  .add({
    command: 'slap'
  })
  .add({
    command: 'smug'
  })
  .add({
    command: 'tickle'
  })
  .add({
    command: 'wallpapers'
  })
  // nsfw
  .add({
    command: 'bondage',
    nsfw: true
  })
  .add({
    command: 'hentai',
    nsfw: true
  })
  .add({
    command: 'thighs',
    nsfw: true
  })

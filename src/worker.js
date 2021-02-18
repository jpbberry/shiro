const Worker = require('discord-rose/worker')
const shiro = require('@jaguar_avi/shiro.gg-wrapper')

const worker = new Worker()

const sfw = ['avatars', 'blush', 'cry', 'hug', 'kiss', 'neko', 'nom', 'pat', 'poke', 'pout', 'slap', 'smug', 'tickle', 'wallpapers']
const nsfw = ['bondage', 'hentai', 'thighs']

worker.commands
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

sfw.forEach(type => {
  worker.commands.add({
    command: type,
    image: true
  })
})

nsfw.forEach(type => {
  worker.commands.add({
    command: type,
    image: true,
    nsfw: true
  })
})

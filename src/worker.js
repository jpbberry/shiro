const Worker = require('discord-rose/worker')
const shiro = require('@jaguar_avi/shiro.gg-wrapper')
const fetch = require('node-fetch')

const worker = new Worker()

fetch('https://shiro.gg/api/endpoints')
  .then(res => res.json())
  .then(({ nsfw, sfw }) => {
    nsfw = nsfw.map(endpoint => endpoint.split('/').pop())
    sfw = sfw.map(endpoint => endpoint.split('/').pop())

    worker.commands
      .setPrefix('shiro')
      .middleware(async (ctx) => {
        if (!ctx.command.image) return true
        if (ctx.command.nsfw && !ctx.channel.nsfw) throw new Error('You must be in an NSFW channel to use this command.')

        const image = await shiro[ctx.command.nsfw ? 'nsfw' : 'sfw'](ctx.command.command)

        ctx.embed
          .color(0xFCD5BA)
          .image(image)
          .send()

        return false
      })
      .add({
        command: 'help',
        exec: (ctx) => {
          const embed = ctx.embed
            .color(0xFCD5BA)
            .description('https://shiro.gg')
            .title('Shiro Help')
            .timestamp()

          const sfwCommands = worker.commands.commands.filter(x => !x.nsfw)
          embed.field('SFW Commands', sfwCommands.map(x => `- \`${ctx.prefix} ${x.command}\``).join('\n'))

          const nsfwCommands = worker.commands.commands.filter(x => x.nsfw)
          embed.field('NSFW Commands', nsfwCommands.map(x => `- \`${ctx.prefix} ${x.command}\``).join('\n'))

          embed.send()
        }
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
  })

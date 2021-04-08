const { Worker } = require('discord-rose')
const shiro = require('@jaguar_avi/shiro.gg-wrapper')
const fetch = require('node-fetch')

const color = 0xFCD5BA

const worker = new Worker()

fetch('https://shiro.gg/api/endpoints')
  .then(res => res.json())
  .then(({ nsfw, sfw }) => {
    nsfw = nsfw.map(endpoint => endpoint.split('/').pop())
    sfw = sfw.map(endpoint => endpoint.split('/').pop())

    worker.commands
      .setPrefix('shiro')
      .middleware(async (ctx) => {
        if (ctx.command.nsfw && !ctx.channel.nsfw) throw new Error('You must be in an NSFW channel to use this command.')

        return true
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
        exec: async (ctx) => {
          worker.api.channels.typing(ctx.channel.id)
          const image = await shiro.sfw(type)

          ctx.embed
            .color(color)
            .image(image)
            .send()
        }
      })
    })

    nsfw.forEach(type => {
      worker.commands.add({
        command: type,
        nsfw: true,
        exec: async (ctx) => {
          worker.api.channels.typing(ctx.channel.id)
          const image = await shiro.nsfw(type)

          ctx.embed
            .color(color)
            .image(image)
            .send()
        }
      })
    })
  })

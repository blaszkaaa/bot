const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['stop', 's'], // You Can Keep Any Name
    description: 'stop.', // Optional

    callback: (message, args) => {
        const channel = message.member.voice // VC Of User
        const myChannel = message.guild.me.voice.channel // VC Of BOT
        if(!channel) return message.reply('Aby zatrzymać muzykę, musisz być połączony z kanałem głosowym') // If User Isn't In VC.
        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue && !myChannel) return message.reply('Nie ma muzyki, nie mogę zatrzymać') // If No Music Is Being Played or BOT Isn't In VC.
        message.client.queue.delete(message.guild.id) // Deletes the Queue or Stops The Music
        myChannel.leave() // Leaves The VC
        // message.reply('Music has Been Stopped, Leaving VC.')
        // OR
        const embed = new MessageEmbed()
        .setTitle('Muzyka zatrzymana')
        .setDescription('Muzyka została zatrzymana. Opuszczam kanał głosowy.')
        .addField('Zatrzymana przez :-', message.author)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter('Zatrzymanie muzyki')
        message.channel.send(embed)
    }
}
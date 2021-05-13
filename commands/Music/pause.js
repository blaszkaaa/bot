const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['pause', 'ps'], 
    description: 'Pauzowanie aktualnej muzyki', 

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) 
        if(serverQueue && serverQueue.playing) {
            serverQueue.playing = false
            serverQueue.connection.dispatcher.pause() 

            const embed = new MessageEmbed()
            .setTitle('Piosenka zatrzymana')
            .setDescription('Piosenka została zatrzymana')
            .addField('Zatrzymana przez', message.author)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('Piosenka zatrzymana')
            return message.channel.send(embed)
        }
        return message.reply('Żaden utwór nie jest odtwarzany\nnie można zatrzymać')
    }
}
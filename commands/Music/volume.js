const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['volume', 'vol'], // You Can Keep Any Name
    description: 'Zmiana Głośności', // Optional

    callback: (message, args) => {
        let title, number
        let argument = args.join(' ')
        const { channel } = message.member.voice
        if(!channel)  return message.reply('Aby zmienić głośność, musisz być połączony z kanałem głosowym.') // If Member Isn't in VC
        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue) return message.reply('Nie jest odtwarzana żadna piosenka.')
        if(!argument) { title = 'Current Volume'; number= serverQueue.volume } // If No Number is Provided BOT Will Send Current Volume
        else {
            let set = parseInt(argument)
            if(isNaN(set)) return message.reply('Głośność musi być liczbą.') // If Volume Number Isn't Number
            else if(set > 100) return message.reply('Głośność nie może być większa niż 100.') // If Volume Is Greater Than 100
            else if(set < 0) return message.reply('Głośność musi być większa niż 0') // If Volume Is -ve or Less Then 0
            serverQueue.volume = set
            serverQueue.connection.dispatcher.setVolumeLogarithmic(set / 100)
            title = 'Głośność ustaw na'
            number = set
        }

        const embed = new MessageEmbed()
        .setTitle(title)
        .setColor('RANDOM')
        .setDescription(number)
        .addField('Głośność zmieniona przez ', message.author)
        .setFooter('Głośność')
        message.channel.send(embed)
    }
}
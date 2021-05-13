const { MessageEmbed, guild } = require("discord.js")

module.exports = {
    commands: ['queue', 'q'], 
    description: 'Pokazuje kolejke utworów', 

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) 
        if(!serverQueue) return message.reply('Nie ma odtwarzanej muzyki, nie można wyświetlić kolejki.') 

        const q = serverQueue.songs

        const embed = new MessageEmbed()
        .setTitle('Kolejka')
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter('Kolejka utworów')
        for (var key in q) { embed.addFields({ name: '\u200b' + `${parseInt(key) + 1}` + ') ' +q[key].title,
    value: '🎶' }) }
    message.channel.send(embed)
    }
}
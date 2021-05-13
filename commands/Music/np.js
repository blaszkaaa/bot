const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['now-playing', 'np'], 
    decription: 'Pokazuje aktualna muzyke', 

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) 
        if(!serverQueue) return message.reply('Nie jest odtwarzana żadna piosenka.')
        const q = serverQueue.songs[0] 
        if(!q) return message.reply('Nie jest odtwarzana żadna muzyka.')
        const duration = q.duration.split(':').reverse().reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)
        const actualSeek = Math.floor((serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000) + 1;
        const seek = new Date(actualSeek * 1000).toISOString().substr(11, 8)
        const timeLeft = new Date((duration - actualSeek) * 1000).toISOString().substr(11, 8)
        let finalTotal 
        if(q.duration.lenght === 4) { finalTotal = "00:0" + q.duration}
        else { finalTotal = q.duration }

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Aktualnie leci')
        .setURL(q.url)
        .setThumbnail(q.thumbnail)
        .addField(`${q.title}`, '<a:Next:803138566091309057>')
        .addField('Czas jaki upłynął:-', seek)
        .addField('Pozostały czas:-', timeLeft)
        .addField('Całkowity czas trwania utworu:-', finalTotal)
        .setTimestamp()
        .setFooter('Teraz odtwarzane')
        message.channel.send(embed)

    }
}

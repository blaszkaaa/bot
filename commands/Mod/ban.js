const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'ban',
    description: 'Bans A User.',
    permissions: 'ADMINISTRATOR', 
    permissionError: 'Nie masz uprawnien do banowania osób',
    expectedArgs: '+ban @User', 

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Musisz wspomnieć o użytkowniku, którego mam zbanować.')
        member.ban()

        const embed = new MessageEmbed()
        .setTitle('Ban użytkownika')
        .setDescription(`<@${member.user.id}> Został zbanowany.`)
        .addField('Zbanowany przez', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}

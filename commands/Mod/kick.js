const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'kick', 
    description: 'Kicks A User.', 
    permissions: 'ADMINISTRATOR', 
    permissionError: 'Nie masz uprawnien do tej komendy',
    expectedArgs: '+Kick @User', 

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Musisz wspomnieć o użytkowniku, którego mam zbanować.') 
        member.kick()

        const embed = new MessageEmbed()
        .setTitle('Użytkownik wyrzucony')
        .setDescription(`<@${member.user.id}> Został wyrzucony.`)
        .addField('Wyrzucony przez', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}
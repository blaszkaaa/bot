const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['mute', 'm'], 
    description: 'Mutes A User.',
    permissions: 'ADMINISTRATOR', 
    permissionError: 'Nie masz uprawnien na wyciszenie kogoś', 
    expectedArgs: '+mute @User', 

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Musisz wspomnieć o użytkowniku, którego mam wyciszyść.')
        member.roles.add('801728021438005288') //tutaj trzeba dodac id roli mute
        if(member.roles.cache.has('801728021438005288')) return message.reply('Użytkownik jest już wyciszony.') 

        const embed = new MessageEmbed()
        .setTitle('Użytkownik wyciszony')
        .setDescription(`<@${member.user.id}> Został wyciszony.`)
        .addField('Wyciszone przez', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}
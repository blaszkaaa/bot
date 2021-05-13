const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unmute', 'um'], // You Can Keep ANy Name
    description: 'Unmutes A User.', // Optinal
    permissions: 'ADMINISTRATOR', // You Can Keep Any Permission
    permissionError: 'Nie masz pozwolenia na wyciszenie kogoś',
    expectedArgs: '+unmute @User', // Optinal

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Wspomnij użytkownika, który ma zostać odmutowany.')
        member.roles.remove('801728021438005288') // Removes Mute Role to User
        if(!member.roles.cache.has('801728021438005288')) return message.reply('Użytkownik nie jest już wyciszony.') // If User Is Already Unmuted.

        const embed = new MessageEmbed()
        .setTitle('Wyłączono wyciszenie użytkownika.')
        .setDescription(`<@${member.user.id}> Nie jest teraz wyciszony.`)
        .addField('Wyłączenie wyciszenia przez', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}
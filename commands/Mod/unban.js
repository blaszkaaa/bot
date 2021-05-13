const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unban', 'ub'], // You Can Keep Any Name
    description: 'Unbans A User Using Its ID',  // Optional
    permissions: 'ADMINISTRATOR', // You Can Keep Any Permission
    permissionError: '',
    expectedArgs: '+unban User-ID', // Optional

    callback: (message, args) => {

        const userID = args[0]
        if(!userID) return message.reply('To odbanowania jest potrzebny User id') // If User ID Is Not Provided.

        // To See If User Is Banned
        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if(bannedUser) { // If User Is Banned Then BOT Will Unban

                const embed =  new MessageEmbed()
                .setTitle('Użytkownik odbanowany')
                .setDescription(`<@${userID}> Został odbanowany`)
                .addField('Odbanowany przez:-', message.author)
                .addField('User ID:-', userID)
                .setColor('RANDOM')

                message.channel.send(embed).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.reply('Nie poprawne id') // If User Is Not Banned.
            }
        })


    }
}
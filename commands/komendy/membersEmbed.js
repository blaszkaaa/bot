const Discord = require('discord.js')
module.exports = {
  name: "membersEmbed",
  aliases: ["md"],
  usage: "md",
  description: "md",
  run: async (client, message, args) => {
    if(message.member.roles.cache.find(r => r.name === "Lider")) {
      const help = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Spis członków gildi')
      .setAuthor('LITR', 'https://imgur.com/rZTaCPx.png')
      .setDescription('<@&841666785832730644> : <@!543745129534717954> \n <@&841666785832730644> : <@!543745129534717954>' )
      .setFooter('LITR na łeb 💪', 'https://imgur.com/rZTaCPx.png');
      message.channel.send(help)
      }else{
        message.react('❌');
      }
  }
}
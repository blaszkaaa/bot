const { MessageEmbed } = require("discord.js");

module.exports = {
    commands: ['zarzad', 'md'], 
    description: 'Zarząd gildi',

    callback: (message, args) => {

        if(message.member.roles.cache.find(r => r.name === "Oliwcia <33333")) {
            const Discord = require('discord.js');
            const help = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('────────Zarząd Gildi────────')
                .setAuthor('Żubr', 'https://cdn.discordapp.com/attachments/801887733412528141/829655699859832872/167065-beers-poland-zubr.gif')
                .addField('Żubr','Zarząd gildi Żubr')
                .setThumbnail('https://lamusdworski.files.wordpress.com/2017/03/poland-zubr-wisent-european_bison-02.jpg?w=584%27')
                .addFields(
                    { name: 'Założyciel', value: '<@!395995789178044427>' },
                    { name: 'Lider', value: '<@!395995789178044427>' },
                    { name: 'Zastępca', value: '<@!570296529575739413>' },
                    { name: 'Zastępca', value: '<@!461843645092462602>' },
                    { name: 'Zastępca', value: '<@!713742521636749352>' },
                    { name: 'Zastępca', value: '<@!694718981726011533>' },
                )
                .addField('Sosy','Zarząd gildi Sos')
                .addFields(
                    { name: 'Założyciel', value: '<@!395995789178044427>' },
                    { name: 'Lider', value: '<@!395995789178044427>' },
                    { name: 'Lider', value: '<@!715190816251052114>' },
                    { name: 'Lider', value: '<@!610438559647793164>' },
                    { name: 'Zastępca', value: '<@!813162878005411841>' },
                )
                .setTimestamp()
                .setFooter('Waleczne Żubery 💪', 'https://cdn.discordapp.com/attachments/801887733412528141/829655699859832872/167065-beers-poland-zubr.gif');
            
            message.channel.send(help)
            }else{
              message.react('❌');
            }

        }
    }


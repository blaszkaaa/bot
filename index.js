const Discord = require('discord.js');
const client = new Discord.Client();

client.queue = new Discord.Collection()

const { token } = require('./config.json')
const loadCommands = require('./commands/load-commands');


client.once('ready', () => {
    console.log('Ready.')
    
    setInterval(() => {
        const statuses = [
            `VC to syf`,
            `testo scamer`,
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "PLAYING"})
    }, 2000) 

    loadCommands(client)
})

client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.login(token)

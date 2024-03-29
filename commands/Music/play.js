const { MessageEmbed, Util, MessageFlags } = require('discord.js')
const ytdl = require('ytdl-core')
const youtube = require('youtube-sr')
const ytpl = require('@distube/ytpl')

module.exports = {
    commands: ['play', 'pl'], 
    description: 'Plays Music', 

    callback: async(message, args) => {

        const { channel } = message.member.voice 
        if(!channel) return message.reply('Musisz być połączony z kanałem głosowym') 
        const permissions = channel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.reply('Nie mam uprawnień do tego kanału') 
        if(!permissions.has('SPEAK')) return message.reply('Nie mam uprawnień do tego kanału') 

        const ytRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi 
        const plRegex = /^.*(list=)([^#\&\?]*).*/gi 
        const serverQueue = message.client.queue.get(message.guild.id)
        const argument = args.join(' ')
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 50, 
            playing: true,
            repeatMode: 0,
        }
        function createSong(title, url, duration, thumbnail) {
        const song = {
            "title": title,
            "url": url,
            "duration": duration,
            "thumbnail": thumbnail
        }
        return song
    }

    function announce(song, started, isPlaylist) {
        let e
        if(isPlaylist) { e = 'PlayLista została dodana' }
        else if(started) { e = 'Started Playing' } 
        else { e = 'Dodano do kolejki'} 

        const embed = new MessageEmbed()
        .setTitle(song.title) 
        .setURL(song.url)
        .setDescription(`Duration: ${song.duration}`) 
        .setThumbnail(song.thumbnail)
        .addField(e) 
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter('Muzka')
        return embed
    }

    if(ytRegex.test(argument) && plRegex.test(argument)) {
        message.reply('Piosenka się ładuje, czekaj').then(async message => {
            if(!serverQueue) { message.client.queue.set(message.guild.id, queueConstruct) }
            try{
                const playlist = await ytpl(argument)
                for(vid in playlist.items) {
                    let plSong = playlist.items[video] 
                    let song = createSong(Util.escapeMarkdown(plSong.title), plSong.url, plSong.duration,
                    plSong.thumbnail)
                    playSong(song, message, channel, serverQueue, true)
                }
                const PlaylistInfo = {
                    title: playlist.title.charAT(0).toUpperCase() + playlist.title.slice(1),
                    url: playlist.url,
                    thumbnail: playlist.items[0].thumbnail,
                    duration: ''
                }
                message.channel.send(announce(PlaylistInfo, false, true))
                return message.delete()
            }
            catch (e) {
                message.channel.send('Nieprawidłowy adres URL playlisty') 
                message.client.queue.delete(message.guild.id)
                console.log(e)
                return message.delete()
            }
        })
    }
    else {
        let song
        if(ytdl.validateURL(argument)) {
            let e = await ytdl.getBasicInfo(argument)
            let songInfo = e.videoDetails
            let duration = new Date(songInfo.lengthSeconds * 1000).toISOString(). substr(11, 8)
            if(duration.startsWith('00:')) { duration = duration.replace('00:', '') }
            song = createSong(Util.escapeMarkdown(songInfo.title), songInfo.video_url, duration, songInfo.thumbnail.thumbnails[0].url)
        }
        else {
            let songInfo = await youtube.searchOne(argument)
            if(songInfo === null) { return message.reply('Nie znaleziono wyników.') }
            song  = createSong(Util.escapeMarkdown(songInfo.title), songInfo.url, songInfo.durationFormatted, songInfo.thumbnail.url)
        }
        playSong(song, message, channel, serverQueue, false)
    }

    async function playSong(song, message, vc, queue, ifPlaylist) {
        if(queue){ 
            queue.songs.push(song)
            if(!ifPlaylist) { message.channel.send(announce(song, false, false)) }
            return
        }
        message.client.queue.set(message.guild.id, queueConstruct)
        queueConstruct.songs.push(song)

        const play = async song => {
            const queue = message.client.queue.get(message.guild.id)
            if(!song) {
                message.guild.me.voice.channel.leave()
                message.client.queue.delete(message.guild.id)
                return
            }
            let stream = ytdl(song.url, {
                filter: "audioonly",
                quality: "highestaudio"
            })

            const dispatcher = queue.connection.play(stream)
            .on('finish', () => {
                if(queue.repeatMode === 0) { queue.songs.shift() }
                else if (queue.repeatMode === 2) { queue.songs.push(queue.songs.shift()) }
                else { null }
                play(queue.songs[0])
            })
            .on('error', error => console.error(error))
            dispatcher.setVolumeLogarithmic(queue.volume / 100)
            if(!ifPlaylist) { queue.textChannel.send(announce(song, true, false)) }
        }
        try{
            const connection = await channel.join()
            queueConstruct.connection = connection
            play(queueConstruct.songs[0])
        } catch (error) {
            console.error(`Nie mogłem dołączyć do VC.\nError: ${error}`)
            message.client.queue.delete(message.guild.id)
            await channel.leave()
            return message.channel.send(`Nie mogłem dołączyć do VC.\nError: ${error}`)
            }
        }
    }
}
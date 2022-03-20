const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { joinVoiceChannel, createAudioPlayer, createAudioResource }  = require("@discordjs/voice");
const { getVoiceConnection } = require("@discordjs/voice");


module.exports = {
    name: "play",
    description: "Joins and plays audio from youtube",
    async execute(messageCreate, args) {
        console.log(messageCreate.member.voice.channel.id)
        console.log(messageCreate.guild.id);
        console.log(messageCreate.guild.voiceAdapterCreator);
        const voiceChannel = messageCreate.member.voice.channel;
        if(!voiceChannel) return messageCreate.channel.send("Join the voice channel first.");
        const permission = voiceChannel.permissionsFor(messageCreate.client.user);
        if(!permission.has("CONNECT")) return messageCreate.channel.send("You don't have the permissions!");
        if(!permission.has("SPEAK")) return messageCreate.channel.send("You don't have the permissions!");
        if(!args.length) return messageCreate.channel.send("You need to send the second argument!");

        const connection = joinVoiceChannel({
          channelId: messageCreate.member.voice.channel.id,
          guildId: messageCreate.guild.id,
          adapterCreator: messageCreate.guild.voiceAdapterCreator,
        })

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            console.log("finding")

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(" "));
        // console.log(video)

        if(video) {
            console.log("found it!")
            const stream = ytdl(video.url, {filter: "audioonly"});
            // connection.subscribe(stream)
            // stream.play()
            const resource = createAudioResource(video.url)
            const player = createAudioPlayer()
            connection.subscribe(player)
            player.play(resource)
            // await connection.subscribe(stream, {seek: 0, volume: 1}).on("finish", () => {
            //     // voiceChannel.leave();
            //     // connection.destroy()
            //     console.log("finished")
            // });


            await messageCreate.reply(`:eggplant: :sweat_drops: :umbrella: Now playing ---${video.title}---`)

        } else {
            messageCreate.channel.send("No videos found!")
        }
    }
}
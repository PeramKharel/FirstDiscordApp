require("dotenv").config();
const axios = require("axios");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.on("ready", () => {
    console.log(`Client is running. Loged in as ${client.user.tag}`);
});

client.on('messageCreate', msg => {
    if(msg.author.discriminator == 3858) {
        msg.reply("Ja Sut!")
    } else if(msg.author.discriminator == 4250) {
        msg.reply("Get some more food!")
    }else if(msg.author.discriminator == 8730) {
        msg.reply("Fly Plane!")
    } else if(msg.author.discriminator == 8304){
        // msg.reply("Glory Glory Man United!")
        msg.channel.send("@everyone hello")
        console.log(msg.content)
    } else {
        return
    }
})


// axios : https://www.reddit.com/r/memes/new/.json?limit=100



// client.on()
client.login(process.env.CLIENT_TOKEN);
require("dotenv").config();
const axios = require("axios");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.on("ready", () => {
    console.log(`Client is running. Loged in as ${client.user.tag}`);
});

client.on('messageCreate', msg => {
    if(msg.content.includes('kale')) {
        msg.reply('Thik garis babu')
    }
})


// axios : https://www.reddit.com/r/memes/new/.json?limit=100



// client.on()
client.login(process.env.CLIENT_TOKEN);
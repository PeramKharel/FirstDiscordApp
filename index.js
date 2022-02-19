require("dotenv").config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.on("ready", () => {
    console.log(`Client is running. Loged in as ${client.user.tag}`);
});

client.on('messageCreate', msg => {
    if(msg.content.includes('kale')) {
        msg.reply('fuk husen')
    }
})

// client.on()
client.login(process.env.CLIENT_TOKEN);
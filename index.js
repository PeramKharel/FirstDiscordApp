require("dotenv").config();
// const axios = require("axios");
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
// const { Routes } = require("@discord-api-types/v9");
const { Player } = require("discord-player");

// const LOAD_SEARCH = process.argv[2] = "load";

// const CLIENT_ID = "927834623625543731";
// const GUILD_ID = "858769904249470990";

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
// const { Discord, Client, Intents } = require('discord.js');
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}


// client.on("ready", () => {
//     console.log(`Client is running. Loged in as ${client.user.tag}`);
// });

// client.on('messageCreate', msg => {
//     if(msg.author.discriminator == 3858) {
//         msg.reply("Ja Sut!")
//     } else if(msg.author.discriminator == 4250) {
//         msg.reply("Get some more food!")
//     }else if(msg.author.discriminator == 8730) {
//         msg.reply("Fly Plane!")
//     } else if(msg.author.discriminator == 8304){
//         // msg.reply("Glory Glory Man United!")
//         msg.channel.send("@everyone hello")
//         console.log(msg.content)
//     } else {
//         return
//     }
// })


// // axios : https://www.reddit.com/r/memes/new/.json?limit=100



// client.login(process.env.CLIENT_TOKEN);

// const Discord = require("discord.js");

// const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Client is running. Loged in as ${client.user.tag}`);
});
// client.on()

const prefix = "::";

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === "play") {
        client.commands.get("play").execute(message, args);
        // message.channel.send("ok")
    }
})

client.login(`${process.env.CLIENT_TOKEN}`);
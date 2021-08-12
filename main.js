//Load modules and src files
const bot_info = require("./bot_info.js");
const events = require("./src/bot_events.js");
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); //try catch??

//Event Handlers
client.on("ready", events.start);

client.login(bot_info.token);


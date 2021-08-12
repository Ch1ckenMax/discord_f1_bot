//Load modules and src files
const bot_info = require("./bot_info.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//Login and create instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(bot_info.token);

//Load slash commands. The comments are saved at ./commands
const commands = [];
client.commands = new Map();
fs.readdir("./commands", (err, commandsList) => {
    if(err) //Fail
        console.error(err);

    else{ //Success
        for(let i = 0; i < commandsList.length; i++) { 
            let currentCommand = require("./commands/" + commandsList[i]);
            commands.push(currentCommand.data.toJSON());
            client.commands.set(currentCommand.data.name, currentCommand);
        }

        //I have no idea what is going on below so I just copied the following from discord.js documentation lmao

        const rest = new REST({ version: '9' }).setToken(bot_info.token);
        
        //Function to load slash commands to specific servers without delays?
        function loadSlash(global, GUILD_ID){
            (async () => {
                try {
                    if(global){
                        console.log('Started refreshing application (/) commands for global.');
                        await rest.put(
                            Routes.applicationCommands(bot_info.bot_id),
                            { body: commands },
                        );
                        console.log('Successfully reloaded application (/) commands for global.');
                    }
                    else{
                        console.log('Started refreshing application (/) commands for test guild.');
                        await rest.put(
                            Routes.applicationGuildCommands(bot_info.bot_id, GUILD_ID),
                            { body: commands },
                        );
                        console.log('Successfully reloaded application (/) commands for test guild ' + GUILD_ID + '.');
                    }

                } catch (error) {
                    console.error(error);
                }
            })(); 
        }

        loadSlash(false, bot_info.guild_id); //Load slash commands to the guild specified by guild_id for testing
        loadSlash(true, null); //Load slash commands to global


    }
        
});

//Load event handlers. The event handlers file are saved at ./events
fs.readdir("./events", (err, files) => {
    if(err) //Fail
        console.error(err);

    else{ //Success
        for(let i = 0; i < files.length; i++) { 
            let currentFile = require("./events/" + files[i]);

            if(files[i] != "interactionCreate.js")
                if(currentFile.on)
                   client.on(currentFile.name, (...args) => {currentFile.run(...args);});
                else
                   client.once(currentFile.name, (...args) => {currentFile.run(...args);});
            else { //Needs to pass the commands list to interactionCreate, thus the special behaviour
                client.on(currentFile.name, (interaction) => {currentFile.run(interaction, client.commands);});
            }
        }
    }
});



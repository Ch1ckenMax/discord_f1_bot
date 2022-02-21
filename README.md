# Introduction
A discord bot that retrieves formula 1 information from the <a href="http://ergast.com/mrd/">ergast api</a> and send it to the discord servers.<br>
Runs on Node.js using <a href="https://discord.js.org/">discord.js</a> module.<BR>
Just a little side project to practice coding and to make my and my friends' life slightly more convenient :).

# Functions & Features
1. Information of the current formula 1 season. (Time til the next race, current driver/constructor standings, calendar of current season etc.)
2. Caching on retrieval of the information from the api.
3. More to come...

# Setup
<h2>Initial setup</h2>
1. Create a text file named bot_info.js under src folder, fill the text file as below

```
module.exports = {
    token: "TOKEN", 
    bot_id: "BOT_ID",
    guild_id: "GUILD_ID"
}
```

Replace TOKEN, BOT_ID according to your bot's information. Replace GUILD_ID according to your test server's information(the server you want to test your commands on) <BR><BR>
2. Download node.js and run the bot by typing ``node main.js`` in the console.

<h2>Enabling & disabling commands</h2>
Before you can use the commands of the bot, the commands must first be loaded from the bot's source code to discord ONCE.<BR><BR>
To enable the commands, Use the functions located at line 86,87 of main.js file.<BR>
- Line 86 is for enabling commands in the test server specificed by GUILD_ID.<BR>
- Line 87 is for enalbing commands for all servers (Note that it takes 1 hour to load the commands to all servers).<BR>
- Line 88 is for disabling all commands.<BR><BR>
These command loading operations are toggle. After each change to the source code of the commands or the first time you run the bot, you can comment it by adding \\ to prevent it from loading again unnecessarily when you restart the bot.

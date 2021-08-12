module.exports = {
    name: "interactionCreate",
    on: true,
    async run(interaction, commands){
        //Disable access for specific user. For bullying purpose :D
        if(interaction.user.id == "333985543324958734"){
            interaction.reply("Fuck off");
            return;
        }

        if(interaction.isCommand()) //commands list might get large and takes some time to search so use async here just in case
            await commands.get(interaction.commandName).execute(interaction);
    }
}
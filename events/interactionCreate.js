module.exports = {
    name: "interactionCreate",
    on: true,
    async run(interaction, commands){
        //Disable access for specific user. For bullying purpose :D
        if(interaction.user.id == "333985543324958734"){
            await interaction.reply("Fuck off");
            return;
        }

        if(interaction.isCommand())
            await commands.get(interaction.commandName).execute(interaction);
    }
}
module.exports = {
    name: "interactionCreate",
    on: true,
    async run(interaction, commands){
        if(interaction.isCommand())
            await commands.get(interaction.commandName).execute(interaction);
    }
}
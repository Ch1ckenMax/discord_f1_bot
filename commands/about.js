const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("Information of the bot."),
	async execute(interaction) {
		await interaction.reply(
            "This is a discord bot created by Ch1ckenMax\n Discord ID: ChickenMax#8201\n GitHub Repo Link: https://github.com/Ch1ckenMax/discord_bot_for_fun"
        );
	},
};
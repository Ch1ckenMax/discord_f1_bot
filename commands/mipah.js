const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mipah")
		.setDescription('command for testing'),
	execute(interaction) {
		interaction.reply("Mipah!");
	},
};
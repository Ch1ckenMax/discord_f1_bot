const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mipah")
		.setDescription('command for testing'),
	async execute(interaction) {
		await interaction.reply('Mipah!');
	},
};
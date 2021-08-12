const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_driver_standing")
		.setDescription("Shows current f1 driver standing."),
	async execute(interaction) { //Might need to wait for server so async here
		await interaction.reply(
            "F1 Driver standings :\n1. Ham Ham 99pts\n2. Ham Ham 99pts\n3. Ham Ham 99pts\n4. Ham Ham 99pts\n5. Verstoppen 0pts"
        );
	},
};
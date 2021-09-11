const { SlashCommandBuilder } = require('@discordjs/builders');
const f1_info = require("../src/f1_info.js");
const {flag, code, name, countries} = require('country-emoji');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_constructor_standing")
		.setDescription("Shows current f1 constructor standing."),
	async execute(interaction) { //Need to wait for server so async here
		interaction.deferReply();
		let dataInJSON = await f1_info.fetch("http://ergast.com/api/f1/current/constructorStandings.json")
		let replyString = ""; //It takes more than 3 seconds so it is needed
		if(dataInJSON.statusText == "OK"){
			let TeamList = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
			let year = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].season;
			replyString = "**F1 "+year+" Current Constructor Standings:**";
			for(let eachTeam of TeamList){
				replyString += "\n **" + eachTeam.position+".** "+flag(eachTeam.Constructor.nationality)+" "+eachTeam.Constructor.name+" \n"+eachTeam.points+"pts" + "\n";
			}
		}
		else{
			replyString = "Error :(";
		}

		interaction.editReply(replyString);
	},
};
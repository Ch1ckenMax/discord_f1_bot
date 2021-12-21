const { SlashCommandBuilder } = require('@discordjs/builders');
const f1_info = require("../src/f1_info.js");
const {flag, code, name, countries} = require('country-emoji');
const InfoCache = require("../src/info_cache.js");

let infoCache = new InfoCache(900000); //each retrieval is stored for 15 minutes

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_constructor_standing")
		.setDescription("Shows current f1 constructor standing."),
	async execute(interaction) { //Need to wait for server so async here

		let replyString = "";
		if(infoCache.requiresRetrieval(Date.now())){ //Retrieve from API
			await interaction.deferReply(); //function should WAIT until the defer reply is completed. So, await is needed.
			let dataInJSON = await f1_info.fetch("http://ergast.com/api/f1/current/constructorStandings.json")
			if(dataInJSON.statusText == "OK"){
				let TeamList = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
				let year = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].season;
				replyString = "**F1 "+year+" Current Constructor Standings:**";
				for(let eachTeam of TeamList){
					replyString += "\n **" + eachTeam.position+".** "+flag(eachTeam.Constructor.nationality)+" "+eachTeam.Constructor.name+" \n"+eachTeam.points+"pts" + "\n";
				}
				infoCache.information = replyString;
			}
			else{
				replyString = "Error :(";
			}
			interaction.editReply(replyString);
		}
		else{ //Retrieve from cache
			replyString = infoCache.information;
			interaction.reply(replyString);
		}
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const {flag, code, name, countries} = require('country-emoji');
const F1_info = require("../src/f1_info.js");
const InfoCache = require("../src/info_cache.js");
const Constants = require("../src/constants.js");

let infoCache = new InfoCache(Constants.CACHE_TIME); //each retrieval is stored for 15 minutes

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_driver_standing")
		.setDescription("Shows current f1 driver standing."),
	async execute(interaction) { //Need to wait for server so async here
		let replyString = "";
		if(infoCache.requiresRetrieval(Date.now())){ //Retrieve from API
			await interaction.deferReply(); //function should WAIT until the defer reply is completed. So, await is needed.
			let dataInJSON = await F1_info.fetch("http://ergast.com/api/f1/current/driverStandings.json")
			if(dataInJSON.statusText == "OK"){
				let driverList = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				let year = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].season;
				replyString = "**F1 "+year+" Current Driver Standings:**";
				for(let eachDriver of driverList){
					replyString += "\n **" + eachDriver.position+".** "+flag(eachDriver.Driver.nationality)+" "+eachDriver.Driver.givenName+" "+eachDriver.Driver.familyName+" "+eachDriver.Driver.permanentNumber+" "+eachDriver.Constructors[0].name+" - "+eachDriver.points+"pts";
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
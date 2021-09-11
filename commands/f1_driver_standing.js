const { SlashCommandBuilder } = require('@discordjs/builders');
const f1_info = require("../src/f1_info.js");
const {flag, code, name, countries} = require('country-emoji');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_driver_standing")
		.setDescription("Shows current f1 driver standing."),
	async execute(interaction) { //Need to wait for server so async here
		interaction.deferReply();
		let dataInJSON = await f1_info.fetch("http://ergast.com/api/f1/current/driverStandings.json")
		let replyString = ""; //It takes more than 3 seconds so it is needed
		if(dataInJSON.statusText == "OK"){
			let driverList = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
			let year = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].season;
			replyString = "**F1 "+year+" Current Driver Standings:**";
			for(let eachDriver of driverList){
				replyString += "\n **" + eachDriver.position+".** "+flag(eachDriver.Driver.nationality)+" "+eachDriver.Driver.givenName+" "+eachDriver.Driver.familyName+" "+eachDriver.Constructors[0].name+" \n"+eachDriver.points+"pts" + "\n";
			}
		}
		else{
			replyString = "Error :(";
		}

		interaction.editReply(replyString);
	},
};
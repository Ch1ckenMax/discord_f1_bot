const { SlashCommandBuilder } = require('@discordjs/builders');
const {flag, code, name, countries} = require('country-emoji');
const search = require("binary-search");
const F1_info = require("../src/f1_info.js");
const InfoCache = require("../src/info_cache.js");
const Constants = require("../src/constants.js");

let infoCache = new InfoCache(Constants.CACHE_TIME); //each retrieval is stored for 15 minutes

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_remaining_races")
		.setDescription("Shows the calendar of remaining races of current f1 season."),
	async execute(interaction) { //Need to wait for server so async here
		let replyString = "";
		if(infoCache.requiresRetrieval(Date.now())){ //Retrieve from API
			await interaction.deferReply(); //function should WAIT until the defer reply is completed. So, await is needed.
			let dataInJSON = await F1_info.fetch("http://ergast.com/api/f1/current.json");
			if(dataInJSON.statusText == "OK"){
                let year = dataInJSON.data.MRData.RaceTable.season;
                let races = dataInJSON.data.MRData.RaceTable.Races;
                let currentTime = Date.now();

                //Find the index of the races remaining
                let nextRaceIndex = search(races,currentTime,function(race,currentTime){let raceTime = new Date(race.date+'T'+race.time); return raceTime - currentTime;}); //races is a reference to an object(an array), so no need to initialize an array again just for passing it to the search function.
                if(nextRaceIndex < 0) nextRaceIndex = ~nextRaceIndex; //Flip it if the time is not exactly the race time

                replyString = "**F1 "+year+" Calendar of the Remaining Races:**";
                if(nextRaceIndex == races.length){ //No races remaining
                    replyString += "\nThe season has ended.";}
                else{//Show races remaining
                    for(let i = nextRaceIndex; i < races.length; i++){
                        let date = new Date(races[i].date);
                        replyString += "\n**R" + races[i].round + "**: " + flag(races[i].Circuit.Location.country) + ' ' + races[i].raceName.substring(0,races[i].raceName.length-10) + "GP - " + date.toString().substring(4,10);
                    }
                }
				infoCache.information = replyString;
                infoCache.setCacheTime();
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
const { SlashCommandBuilder } = require('@discordjs/builders');
const {flag, code, name, countries} = require('country-emoji');
const search = require("binary-search");
const F1_info = require("../src/f1_info.js");
const InfoCache = require("../src/info_cache.js");
const Constants = require("../src/constants.js");

let infoCache = new InfoCache(Constants.CACHE_TIME); //each retrieval is stored for 15 minutes

function miliToOutputString(time1,time2){ //Returns the difference in time between two dates in string.
    let diff = time1-time2;
    if(diff < 0) return "0";
    let day = Math.floor((diff)/(1000*60*60*24));
    let hour = Math.floor((diff - day*1000*60*60*24)/(1000*60*60));
    let minute = Math.floor((diff - day*1000*60*60*24 - hour*1000*60*60)/(1000*60));
    return day + " days, " + hour + " hours, " + minute + " minutes.";
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("f1_next_race")
		.setDescription("Shows the information of next race."),
	async execute(interaction) { //Need to wait for server so async here
		let replyString = "";
		if(infoCache.requiresRetrieval(Date.now())){ //Retrieve from API
			await interaction.deferReply(); //function should WAIT until the defer reply is completed. So, await is needed.
			let dataInJSON = await F1_info.fetch("http://ergast.com/api/f1/current.json");
			if(dataInJSON.statusText == "OK"){
                let races = dataInJSON.data.MRData.RaceTable.Races;
                let currentTime = Date.now();

                //Find the index of the races remaining
                let nextRaceIndex = search(races,currentTime,function(race,currentTime){let raceTime = new Date(race.date+'T'+race.time); return raceTime - currentTime;}); //races is a reference to an object(an array), so no need to initialize an array again just for passing it to the search function.
                if(nextRaceIndex < 0) nextRaceIndex = ~nextRaceIndex; //Flip it if the time is not exactly the race time

                replyString = "**Information of the upcoming F1 race:**";

                let raceDate = 0; //0 after execution means the season has ended
                if(nextRaceIndex == races.length){ //No races remaining
                    replyString += "\nThe season has ended.";}
                else{//Show next race
                    raceDate = new Date(races[nextRaceIndex].date+'T'+races[nextRaceIndex].time);
                    replyString += "\n**Race " + races[nextRaceIndex].round + "**: " + flag(races[nextRaceIndex].Circuit.Location.country) + ' ' + races[nextRaceIndex].raceName.substring(0,races[nextRaceIndex].raceName.length-10) + "GP";
                    replyString += "\n**Date and Time**: " + raceDate;
                    replyString += "\n**Time Til Next Race**: ";
                }
				infoCache.information = [replyString, raceDate];
                infoCache.setCacheTime();
                if(raceDate > 0)
                    interaction.editReply(replyString + miliToOutputString(raceDate,currentTime));
                else
                    interaction.editReply(replyString);
			}
			else{
                interaction.editReply("Error :(");
			}
		}
		else{ //Retrieve from cache
			replyString = infoCache.information[0];
            let raceDate = infoCache.information[1];
            if(raceDate > 0)
			    interaction.reply(replyString + miliToOutputString(raceDate,Date.now()));
            else
                interaction.reply(replyString);
		}
	},
};
//Scrapes formula 1 website and returns current f1 season standings

const scraper = require("axios");

//Function to scrape a webpage from the url argument. Returns the response axios object
//If there is an error (e.g. cant connect with the server), it returns null
async function fetch(url){
    try{
        let response = await scraper.get(url);
        console.log("GET request to " + url + ". HTTP status message: " + response.statusText);
        return response;
    }
    catch(error){
        console.log(error);
        return null;
    }

}

//Returns an array of objects that contains the f1 driver info in the order of latest f1 standings
async function getLatestDriverStanding(){
    let dataInJSON = await fetch("http://ergast.com/api/f1/current/driverStandings.json");

    if(dataInJSON.statusText == "OK"){
        let DriverList = dataInJSON.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(DriverList);
        return DriverList;
    }
    else
        return null;
}

module.exports = {
    getLatestDriverStanding
}

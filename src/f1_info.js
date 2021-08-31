//Scrapes formula 1 website and returns current f1 season standings
const scraper = require("axios");

//Function to scrape a webpage from the url argument. Returns the response axios object
async function fetch(url){
    try{
        var response = await scraper.get(url);
        console.log("GET request to " + url + ". HTTP status message: " + response.statusText);
    }
    catch(error){
        console.log(error);
    }

    return response;
}

(async () => {
console.log("doggo1");
let doggo = fetch("http://ergast.com/api/f1/current/driverStandings");
console.log("doggo2");
})();

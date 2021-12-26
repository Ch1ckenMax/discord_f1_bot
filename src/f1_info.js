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

module.exports = {
    fetch
}

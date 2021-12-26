//Usage: Temporarily stores the information retrieved from the F1 API. 
//On average it takes 3 seconds to retrieve the information from the API. It is too time consuming. 
//As there is no need to retrieve those information in real time or update it frequently, I wrote this cache to temporarily store it, and only retrieve it once per a certain time period. so there is no need to wait 3 seconds everytime.

module.exports = class InfoCache{
    constructor(storeDuration){ //In miliseconds
        this.#storeDuration = storeDuration;
    }

    //Private members. Encapsulated.
    #storeDuration;
    #cacheTime = 0;

    //The information to be stored. No special data validation needed so no need to use getter/setter here.
    information = NaN;

    setCacheTime(){
        this.#cacheTime = Date.now();
    }

    requiresRetrieval(currentTime){ //Check if retrieval from API is needed. Returns a boolean value.
        if(this.#cacheTime == 0) //First request
            return true;
        //Subsequent requests. Check time
        return (currentTime - this.#cacheTime > this.#storeDuration);
    }
}
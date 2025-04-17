// This file, 'country-dao.js', is responsible for those fetching operations which pertain to countries' information.




// We import a utility function we created in a relevant folder elsewhere.
// It lets us access the failsafe of REST Countries data, should that API be down.
const {failsafe_data} = require("../Utilities/failsafe-data");




// A new class is created for the country DAO of our Node.js application.
// Its operations allow us to return all the data of either one entry or all entries in the 'REST Countries' API.
class country_dao {
    
    

    // We use a constructor when creating an object of this class. It's empty though.
    constructor () {};
    
    

    // We define an asynchronous function that retrieves all data for all countries.
    async get_all_countries() {

        
        // We first try to see if we can get without needing failsafe data.
        try {

            // We try to fetch data from a 'REST Countries' endpoint, and return the results.
            const result_raw = await fetch("https://restcountries.com/v3.1/all");
            const result_raw_json = await result_raw.json();
            return result_raw_json;

        }

        
        // If all else fails, we try retrieval from the failsafe data.
        catch (error_get) {
            
            // We save the failsafe data into a variable.
            const result_failsafe = failsafe_data;
            
            // If the above step fails, a corresponding error is thrown.
            if (!result_failsafe) {
                throw new Error("This app failed to fetch entries for all countries' data");
            };
            
            // If the saving succeeded, the failsafe data is returned.
            return result_failsafe;

        };


    };
    
    
    
    // We define an asynchronous function that retrieves all data for one country.
    async get_country_by_name(searched_name) {


        // We first try to see if we can get without needing failsafe data.
        try {

            // We try to fetch data from a 'REST Countries' endpoint.
            const result_raw = await fetch(`https://restcountries.com/v3.1/name/${searched_name}?fullText=true`);
            const result_raw_json = await result_raw.json();

            // If no data exists for the country name a user searches with, a corresponding error is thrown.
            if ((result_raw_json.message)&&(result_raw_json.message==="Not Found")) {
                throw new Error("404>>REST Countries doesn't hold any data entries associated with the searched country name");
            };

            // If a data entry was successfully fetched, we return the results.
            return result_raw_json;

        }


        // If all else fails, we try retrieval from the failsafe data.
        catch (error_get) {
            
            // We save the failsafe data into a variable.
            const result_failsafe = failsafe_data;

            // If the above step fails, a corresponding error is thrown.
            if (!result_failsafe) {
                throw new Error("500>>This app failed to fetch an entry for a single country's data");
            }

            // If the saving succeeded, some more operations occur.
            else {
                // A for loop is used to try and copy a data entry into a list for a specific country being searched for.
                const result_failsafe_single = [];
                for (let i=0; i<result_failsafe.length; i++) {
                    var current_country_name = result_failsafe[i].name.common;
                    if (current_country_name.toLowerCase()===searched_name.toLowerCase()) {
                        result_failsafe_single.push(result_failsafe[i]);
                    };
                };
                // If not one data entry is copied, a corresponding error is thrown.
                if (result_failsafe_single.length!=1) {
                    throw new Error("404>>REST Countries doesn't hold any data entries associated with the searched country name");
                };
                // If the copying succeeded, the failsafe data is returned.
                return result_failsafe_single;
            };

        };


    };



};




// We export our country DAO. The country service can now call its functions to fulfil its business logic.
module.exports = {country_dao};
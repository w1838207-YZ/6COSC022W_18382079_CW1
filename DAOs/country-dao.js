// This file, 'country-dao.js', is responsible for .




//
//
const {failsafe_data} = require("../Utilities/failsafe-data");




//
//
class country_dao {
    
    
    //
    constructor () {};
    
    
    //
    async retrieve_every_countries_data() {

        //
        try {
            //
            const result_raw = await fetch("https://restcountries.com/v3.1/all");
            const result_raw_json = await result_raw.json();
            return result_raw_json;
        }

        //
        catch (error_get) {
            //
            const result_failsafe = failsafe_data;
            //
            if (result_failsafe) {
                return result_failsafe;
            }
            //
            else {
                throw new Error("Error! This app failed to fetch entries for all countries' data");
            };
        };

    };
    
    
    //
    async retrieve_single_country_data(searched_name) {

        //
        try {
            //
            const result_raw = await fetch(`https://restcountries.com/v3.1/name/${searched_name}?fullText=true`);
            const result_raw_json = await result_raw.json();
            //
            if ((result_raw_json.message)&&(result_raw_json.message==="Not Found")) {
                throw new Error("Error! REST Countries doesn't hold a specific data entry associated with the searched country name");
            }
            //
            else {
                return result_raw_json;
            };
        }

        //
        catch (error_get) {
            //
            if (error_get.message==="Error! REST Countries doesn't hold a specific data entry associated with the searched country name") {
                throw new Error(error_get.message);
            }
            //
            else {
                //
                const result_failsafe = failsafe_data;
                //
                if (result_failsafe) {
                    //
                    const result_failsafe_single = [];
                    for (let i=0; i<result_failsafe.length; i++) {
                        var current_country_name = result_failsafe[i].name.common;
                        if (current_country_name.toLowerCase().includes(searched_name.toLowerCase())) {
                            result_failsafe_single.push(result_failsafe[i]);
                        };
                    };
                    //
                    if (result_failsafe_single.length===1) {
                        return result_failsafe_single;
                    }
                    //
                    else if (result_failsafe_single.length>1) {
                        throw new Error("Error! This app fetched entries for more than 1 country wrongfully");
                    }
                    //
                    else {
                        throw new Error("Error! REST Countries holds no data entries associated with the searched country name");
                    };
                }
                //
                else {
                    throw new Error("Error! This app failed to fetch an entry for a single country's data");
                };
            };
        };

    };


};




//
module.exports = {country_dao};
// This file, 'country-service.js', is responsible for handling the business logic of our Node.js application which is related to countries' information.




// We import a required DAO class we created in a relevant folder elsewhere.
// Its functions handle database operations linked to the 'REST Countries' API.
const {country_dao} = require("../DAOs/country-dao");

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");




// We define an asynchronous function, which is used to cherry-pick country data.
// It is called after all the data for all countries or for one country is fetched.
async function extract_relevant_country_information(json_data) {


    // An empty list is defined, where essential information will eventually end up.
    var result_cherry_picked = [];
    
    
    // A loop iterates over raw data accessed from REST Countries by the country DAO.
    for (let i=0; i<json_data.length; i++) {

        // A current country is captured from the raw data, in each loop iteration.
        var current_country = json_data[i];

        // A JSON object is initialised which later gets pushed into the above list.
        var data_to_push = {
            "name" : "N/A",
            "currency" : "N/A",
            "capital" : "N/A",
            "language" : "N/A",
            "flag" : "N/A"
        };

        // The JSON object is populated by the current country's name(s).
        if (current_country.name) {
            var names_to_add = {};
            if (current_country.name.common) {
                names_to_add["common"] = current_country.name.common;
            };
            if (current_country.name.official) {
                names_to_add["official"] = current_country.name.official;
            };
            data_to_push.name = names_to_add;
        };
        
        // The JSON object is populated by the current country's currency/currencies.
        if (current_country.currencies) {
            var currencies_to_add = {};
            var j = 1;
            for (let key in current_country.currencies) {
                currencies_to_add[`${j}`] = current_country.currencies[key].name
                j++;
            };
            data_to_push.currency = currencies_to_add;
        };

        // The JSON object is populated by the current country's capital(s).
        if (current_country.capital) {
            var capitals_to_add = {};
            for (let j=0; j<current_country.capital.length; j++) {
                capitals_to_add[`${j+1}`] = current_country.capital[j];
            };
            data_to_push.capital = capitals_to_add;
        };
        
        // The JSON object is populated by the current country's language(s).
        if (current_country.languages) {
            var languages_to_add = {};
            var j = 1;
            for (let key in current_country.languages) {
                languages_to_add[`${j}`] = current_country.languages[key]
                j++;
            };
            data_to_push.language = languages_to_add;
        };
        
        // The JSON object is populated by the current country's flag(s).
        if (current_country.flags) {
            var flags_to_add = {};
            if (current_country.flags.png) {
                flags_to_add["png"] = current_country.flags.png;
            }
            else {
                flags_to_add["svg"] = current_country.flags.svg;
            };
            if (current_country.flags.alt) {
                flags_to_add["alt"] = current_country.flags.alt;
            };
            data_to_push.flag = flags_to_add;
        };

        // The JSON for select data of the current country is added to the empty list.
        result_cherry_picked.push(data_to_push);

    };


    // The list (of essential data) made at the start of this function is returned.
    return result_cherry_picked;


};




// A new class is created for the country service of our Node.js application.
// Its operations define how we want to process country data outside of a DAO class.
class country_service {
    

    // We use a constructor when creating an object of this class.
    constructor () {

        // We make an instance of the imported country DAO class, via its constructor.
        this.country_dao = new country_dao();

    };


    // We define an asynchronous function that retrieves select data of all countries.
    async retrieve_every_countries_data() {

        // Our app tries to get all countries' data via a related DAO operation.
        // The earlier asynchronous function is used to cherry-pick essential info.
        // A custom response tries to pass the extract back to the country router.
        try {
            const result_json = await this.country_dao.get_all_countries();
            const result_extract = await extract_relevant_country_information(result_json);
            return create_response(true,result_extract,"No errors here~ You've successfully gotten entries for all countries' data");
        }

        // If an error occurs, it safely passes to the country router with a newly thrown error.
        catch (error_get) {
            throw new Error(error_get.message);
        };

    };


    // We define an asynchronous function that retrieves select data of one country.
    async retrieve_single_country_data(searched_name) {

        // Our app tries to get one country's data via a related DAO operation.
        // The earlier asynchronous function is used to cherry-pick essential info.
        // A custom response tries to pass the extract back to the country router.
        try {
            const result_json = await this.country_dao.get_country_by_name(searched_name);
            const result_extract = await extract_relevant_country_information(result_json);
            return create_response(true,result_extract,"No errors here~ You've successfully gotten an entry for a single country's data");
        }

        // If an error occurs, it safely passes to the country router with a newly thrown error.
        catch (error_get) {
            throw new Error(error_get.message);
        };
        
    };
    

};




// We export our country service. The country router can now call its functions inside any given route.
module.exports = {country_service};
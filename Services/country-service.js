// This file, 'country-service.js', is responsible for .




//
//
const {country_dao} = require("../DAOs/country-dao");

//
//
const {create_response} = require("../Utilities/create-response");




//
//
function extract_relevant_country_information(json_data) {


    //
    var result_cherry_picked = [];


    //
    var result_cherry_picked_ordered = [];
    
    
    //
    for (let i=0; i<json_data.length; i++) {

        //
        var current_country = json_data[i];

        //
        var data_to_push = {
            "name" : "N/A",
            "currency" : "N/A",
            "capital" : "N/A",
            "language" : "N/A",
            "flag" : "N/A"
        };

        //
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
        
        //
        if (current_country.currencies) {
            var currencies_to_add = {};
            var j = 1;
            for (let key in current_country.currencies) {
                currencies_to_add[`${j}`] = current_country.currencies[key].name
                j++;
            };
            data_to_push.currency = currencies_to_add;
        };

        //
        if (current_country.capital) {
            var capitals_to_add = {};
            for (let j=0; j<current_country.capital.length; j++) {
                capitals_to_add[`${j+1}`] = current_country.capital[j];
            };
            data_to_push.capital = capitals_to_add;
        };
        
        //
        if (current_country.languages) {
            var languages_to_add = {};
            var j = 1;
            for (let key in current_country.languages) {
                languages_to_add[`${j}`] = current_country.languages[key]
                j++;
            };
            data_to_push.language = languages_to_add;
        };
        
        //
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

        //
        result_cherry_picked.push(data_to_push);

    };


    //
    return result_cherry_picked;


};




//
//
class country_service {
    
    //
    constructor () {
        this.country_dao = new country_dao();
    };

    //
    async get_all_countries() {
        try {
            const result_json = await this.country_dao.retrieve_every_countries_data();
            const result_extract = extract_relevant_country_information(result_json);
            return create_response(true,result_extract,"No errors here~ You've successfully got entries for all countries' data");
        }
        catch (error_get) {
            return create_response(false,null,error_get.message);
        };
    };

    //
    async get_country_by_name(searched_name) {
        try {
            const result_json = await this.country_dao.retrieve_single_country_data(searched_name);
            const result_extract = extract_relevant_country_information(result_json);
            return create_response(true,result_extract,"No errors here~ You've successfully got an entry for a single country's data");
        }
        catch (error_get) {
            return create_response(false,null,error_get.message);
        };
    };
    
};




//
module.exports = {country_service};
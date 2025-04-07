//
const {create_response} = require("../Utilities/create-response")




//
function extract_country_information(result_json) {


    //
    var result_data = []


    //
    for (let i=0; i<result_json.length; i++) {

        //
        var current_country = result_json[i]

        //
        var data_to_push = {
            "name" : "N/A",
            "currency": "N/A",
            "capital" : "N/A",
            "language" : "N/A",
            "flag" : "N/A"
        }

        //
        if (current_country.name) {
            var names_to_add = {}
            if (current_country.name.common) {
                names_to_add["common"] = current_country.name.common
            }
            if (current_country.name.official) {
                names_to_add["official"] = current_country.name.official
            }
            data_to_push.name = names_to_add
        }

        //
        if (current_country.currencies) {
            var currencies_to_add = {}
            var j = 1
            for (let key in current_country.currencies) {
                currencies_to_add[`${j}`] = current_country.currencies[key].name
                j++
            }
            data_to_push.currency = currencies_to_add
        }

        //
        if (current_country.capital) {
            var capitals_to_add = {}
            for (let j=0; j<current_country.capital.length; j++) {
                capitals_to_add[`${j+1}`] = current_country.capital[j]
            }
            data_to_push.capital = capitals_to_add
        }

        //
        if (current_country.languages) {
            var languages_to_add = {}
            var j = 1
            for (let key in current_country.languages) {
                languages_to_add[`${j}`] = current_country.languages[key]
                j++
            }
            data_to_push.language = languages_to_add
        }

        //
        if (current_country.flags) {
            var flags_to_add = {}
            if (current_country.flags.png) {
                flags_to_add["png"] = current_country.flags.png
            }
            if (current_country.flags.alt) {
                flags_to_add["alt"] = current_country.flags.alt
            }
            data_to_push.flag = flags_to_add
        }

        //
        result_data.push(data_to_push)

    }


    result_data.sort(function(a,b){
        return a.name.common - b.name.common
    })


    return result_data


}




//
class country_dao {

    //
    constructor () {}

    //
    async get_all_countries() {
        try {
            const result_raw = await fetch("https://restcountries.com/v3.1/all")
            const result_json = await result_raw.json()
            const result_data = extract_country_information(result_json)
            return create_response(true,result_data)
        }
        catch (error_get) {
            return create_response(false,null,"Oops!")
        }
    }

    //
    async get_country_by_name(name) {
        try {
            const result_raw = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            const result_json = await result_raw.json()
            if ((result_json.message) && (result_json.message==="Not Found")) {
                throw new Error
            }
            else {
                const result_data = extract_country_information(result_json)
                return create_response(true,result_data)
            }
        }
        catch (error_get) {
            return create_response(false,null,"Oops!")
        }
    }
    
}




//
module.exports = country_dao
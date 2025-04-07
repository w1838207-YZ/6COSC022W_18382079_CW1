//
const country_dao = require("../DAOs/country-dao")




//
class country_service {
    
    //
    constructor () {
        this.country_dao = new country_dao()
    }

    //
    async get_all_countries() {
        const result_object = await this.country_dao.get_all_countries()
        return result_object
    }

    //
    async get_country_by_name(name) {
        const result_object = await this.country_dao.get_country_by_name(name)
        return result_object
    }
    
}




//
module.exports = country_service
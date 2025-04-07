//
const apikey_dao = require("../DAOs/apikey-dao")

//
const {v4:uuidv4} = require("uuid")




//
class apikey_service {
    
    //
    constructor () {
        this.apikey_dao = new apikey_dao()
    }

    //
    async create_apikey() {
        const key_value = uuidv4()
        return await this.apikey_dao.create_apikey(1,key_value)
    }

    //
    async validate_apikey(key_value) {}

}




//
module.exports = apikey_service
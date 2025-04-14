//
//
const {apikey_dao} = require("../DAOs/apikey-dao");

//
//
const {v4:uuidv4} = require("uuid");




//
//
class apikey_service {

    //
    constructor () {
        this.apikey_dao = new apikey_dao();
    };

    //
    async generate(request_object) {
        const value_for_new_apikey = uuidv4();
        return await this.apikey_dao.create_apikey(request_object.session.user.id,value_for_new_apikey);
    };

    //
    async validate(key_value) {
        const result_object = await this.apikey_dao.get_apikey_by_key_value(key_value);
        return result_object
    };

};
//
module.exports = {apikey_service};
//
const pool = require("../Databases/sql-conn")

//
const {create_response} = require("../Utilities/create-response")




//
class apikey_dao {

    //
    constructor () {}



    //
    async create_apikey(user_ID,key_value) {


        return new Promise((resolve_object,reject_object) => {

            pool.run("insert into _apikeys_ (_user_id_,_key_value_) values(?,?)", [user_ID,key_value], (error_run,rows) => {
                if (error_run) {
                    reject_object(error_run)
                }
                resolve_object(create_response(true,key_value))
            })

        })


    }



    //
    async get_apikey_by_key_value(key_value) {


        return new Promise((resolve_object,reject_object) => {

            pool.run("select _key_value_, _is_active_ from _apikeys_ where _key_value_ = ?", [key_value], (error_run,rows) => {
                if (error_run) {
                    reject_object(error_run)
                }
                resolve_object(create_response(true,rows))
            })

        })


    }



}




//
module.exports = apikey_dao
//
//
const {connection_pool} = require("../Databases/sql-connection");

//
//
const {create_response} = require("../Utilities/create-response");




//
class apikey_dao {


    //
    constructor() {};


    //
    async create_apikey(given_id,key_value) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _apikeys_ (_user_id_,_apikey_) values(?,?)", [given_id,key_value], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("Error! 12/04 A"));
                };
                resolve_object(create_response(true,key_value,"No errors here~ 12/04 A"));
            });
        });
    };


    //
    async get_apikey_by_key_value(key_value) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select _is_active_ from _apikeys_ where _apikey_ = ? and _is_active_ = 1", [key_value], (error_get,result_rows) => {
                if (error_get) {
                    reject_object(new Error("Error! 12/04 B"));
                };
                console.log(result_rows);
                if (!result_rows) {
                    resolve_object(create_response(false,null));
                }
                resolve_object(create_response(true,result_rows,"No errors here~ 12//04 B"));
            });
        });
    }


};




//
module.exports = {apikey_dao};
// This file, 'apikey-dao.js', is responsible for those fetching operations which pertain to API keys.




// We import a pool object we created in a relevant folder elsewhere.
// It lets us connect with our database and run SQL queries.
const {connection_pool} = require("../Databases/sql-connection");

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");




// A new class is created for the API key DAO of our Node.js application.
// Its operations allow us to generate records for new API keys or retrieve records for existing ones.
class apikey_dao {


    // We use a constructor when creating an object of this class. It's empty though.
    constructor() {};


    // We define an asynchronous function. It runs an SQL query which attempts to create a record for a new API key in our database.
    async create_apikey(user_ID,key_value) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _apikeys_ (_user_id_,_key_value_) values(?,?)", [user_ID,key_value], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("500>>This app failed to generate a new API key for you to utilise"));
                };
                resolve_object(create_response(true,key_value,"No errors here~ You've successfully generated a new API key for yourself"));
            });
        });
    };
    
    
    // We define an asynchronous function. It would have been used to get all API key records in our database, but it is unimplemented in this submission.
    async get_all_apikeys_of_user(user_ID) {};


    // We define an asynchronous function. It runs an SQL query which attempts to get an individual API key record in our database, based on a given key value.
    async get_apikey_by_key_value(key_value,user_ID) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select _is_active_ from _apikeys_ where _key_value_ = ? and _user_id_ = ?", [key_value,user_ID], (error_get,result_rows) => {
                if (error_get) {
                    reject_object(new Error("500>>This app failed to get the active field from one of your API key records based on key value"));
                };
                if (!result_rows) {
                    resolve_object(new Error("401>>You have not supplied a valid and active API key *you* own as part of your request"));
                };
                resolve_object(create_response(true,result_rows,"No errors here~ You've successfully gotten the active attribute from one of your API keys"));
            });
        });
    }

    
    // We define an asynchronous function. It would have been used to get update API key records in our database (specifically by updating the field _is_active_ to enable any key), but it is unimplemented in this submission.
    async update_apikey_to_activate(apikey_ID) {};


    // We define an asynchronous function. It would have been used to get update API key records in our database (specifically by updating the field _is_active_ to disable any key), but it is unimplemented in this submission.
    async update_apikey_to_deactivate(apikey_ID) {};


    // We define an asynchronous function. It would have been used to get update API key records in our database (specifically by updating the field _last_used_), but it is unimplemented in this submission.
    async update_apikey_when_used(key_value) {};


    // We define an asynchronous function. It would have been used to get delete API key records in our database, but it is unimplemented in this submission.
    async delete_apikey(apikey_ID) {};


};




// We export our API key DAO. The API key service can now call its functions to fulfil its business logic.
module.exports = {apikey_dao};
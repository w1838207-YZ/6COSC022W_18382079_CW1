//
//
const {connection_pool} = require("../Databases/sql-connection");

//
//
const {create_response} = require("../Utilities/create-response");




//
//
class user_dao {
    
    
    //
    constructor () {};

    
    //
    async create_user(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _users_ (_email_,_password_,_fn_,_sn_) values(?,?,?,?)", [...Object.values(request_object.body)], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("Error! This app failed to create a new user account with the credentials supplied"));
                };
                resolve_object(create_response(true,result_rows,"No errors here~ You've successfully registered"));
            });
        });
    };

    
    //
    async get_all_users() {};

    
    //
    async get_user_by_email(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select * from _users_ where _email_ = ?", [request_object.body.email], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("Error! This app failed to log into an existing user account with the credentials supplied"));
                };
                resolve_object(create_response(true,result_rows,"No errors here~ You've successfully logged in"));
            });
        });
    };

    
    //
    async update_user() {};

    
    //
    async delete_user() {};
    

};




//
module.exports = {user_dao};
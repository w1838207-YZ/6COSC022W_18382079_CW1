//
const pool = require("../Databases/sql-conn")

//
const {create_response} = require("../Utilities/create-response")




//
class user_dao {



    //
    constructor () {}



    //
    async create_user(request_object) {
        
        
        return new Promise((resolve_object,reject_object) => {
            
            pool.run("insert into _users_ (_email_,_password_,_fn_,_sn_) values(?,?,?,?)", [...Object.values(request_object.body)], (error_run,rows) => {
                if (error_run) {
                    reject_object(error_run)
                }
                resolve_object(create_response(true,rows))
            })

        })


    }



    //
    //async get_all_users() {}



    //
    async get_user_by_email(email) {


        return new Promise((resolve_object,reject_object) => {
            
            pool.run("select * from _users_ where _email_ = ?", [email], (error_run,rows) => {
                if (error_run) {
                    reject_object(error_run)
                }
                resolve_object(create_response(true,"You're successfully logged in!"))
            })

        })


    }


    
}




//
module.exports = user_dao
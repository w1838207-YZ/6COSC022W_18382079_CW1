// This file, 'user-dao.js', is responsible for those fetching operations which pertain to user accounts.




// We import a pool object we created in a relevant folder elsewhere.
// It lets us connect with our database and run SQL queries.
const {connection_pool} = require("../Databases/sql-connection");

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");




// A new class is created for the user DAO of our Node.js application.
// Its operations allow us to register new accounts or log into existing ones.
class user_dao {
    
    
    // We use a constructor when creating an object of this class. It's empty though.
    constructor () {};

    
    // We define an asynchronous function. It runs an SQL query which attempts to create a record for a new user account in our database.
    async create_user(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.run("insert into _users_ (_email_,_password_,_forename_,_surname_) values(?,?,?,?)", [...Object.values(request_object.body)], (error_run,result_rows) => {
                if (error_run) {
                    reject_object(new Error("500>>This app failed to create for you a new user account with the credentials supplied"));
                };
                resolve_object(create_response(true,null,"No errors here~ You've successfully registered a new user account"));
            });
        });
    };


    // We define an asynchronous function. It would have been used to get all user account records in our database, but it is unimplemented in this submission.
    async get_all_users(request_object) {};

    
    // We define an asynchronous function. It runs an SQL query which attempts to get an individual user account record in our database, based on a given email.
    async get_user_by_email(request_object) {
        return new Promise((resolve_object,reject_object) => {
            connection_pool.get("select * from _users_ where _email_ = ?", [request_object.body.email], (error_get,result_rows) => {
                if (error_get) {
                    reject_object(new Error("500>>This app failed to log you into an existing user account with the credentials supplied"));
                };
                if (!result_rows) {
                    reject_object(new Error("401>>You cannot log into an existing user account with these credentials you have provided"));
                };
                resolve_object(create_response(true,result_rows,"No errors here~ You've successfully logged in with an existing user account"));
            });
        });
    };


    // We define an asynchronous function. It would have been used to get update user account records in our database (specifically by updating the field _last_logged_in_), but it is unimplemented in this submission.
    async update_user(request_object) {};


    // We define an asynchronous function. It would have been used to get delete user account records in our database, but it is unimplemented in this submission.
    async delete_user(request_object) {};

    
};




// We export our user DAO. The user service can now call its functions to fulfil its business logic.
module.exports = {user_dao};
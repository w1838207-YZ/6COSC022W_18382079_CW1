// This file, 'user-service.js', is responsible for handling the business logic of our Node.js application which is related to user accounts.




// We import a required DAO class we created in a relevant folder elsewhere.
// Its functions handle database operations linked to user accounts on our app.
const {user_dao} = require("../DAOs/user-dao");

// We import two utility functions we created in a relevant folder elsewhere.
// They lets us hash passwords for registration, and verify passwords for logging in.
const {generate_hash,verify_password} = require("../Utilities/bcrypt-utility");




// A new class is created for the user service of our Node.js application.
// Its operations define how we want to process user accounts outside of a DAO class.
class user_service {


    // We use a constructor when creating an object of this class.
    constructor () {

        // We make an instance of the imported user DAO class, via its constructor.
        this.user_dao = new user_dao();

    };

    
    // We define an asynchronous function that registers a new account for a user.
    async register(request_object) {
        
        // If a user misses any credentials, a corresponding error is thrown.
        if (((!request_object.body.email)||(!request_object.body.password)) || ((!request_object.body.forename)||(!request_object.body.surname))) {
            throw new Error("401>>Users must provide a unique email, password, and first and last names to create an account");
        };

        // Our app tries to hash the provided password, and create a new user account.
        try {
            request_object.body.password = await generate_hash(request_object.body.password);
            const result_object = await this.user_dao.create_user(request_object);
            return result_object;
        }
        
        // If an error occurs, it safely passes to the user router with a newly thrown error.
        catch (error_register) {
            throw new Error(error_register.message);
        };
        
    };

    
    // We define an asynchronous function that logs a user into an existing account.
    async login(request_object) {

        // If a user misses any credentials, a corresponding error is thrown.
        if ((!request_object.body.email)||(!request_object.body.password)) {
            throw new Error("401>>Users must provide an existing email and password to log into an account");
        };

        // Our app tries to perform a series of operations.
        try {
            // We try to log a user into an existing account, with credentials given.
            const result_object = await this.user_dao.get_user_by_email(request_object);
            // We check for if the user-supplied password matches one in our database.
            const matching = await verify_password(request_object.body.password,result_object.data._password_);
            // If a match doesn't exist, a corresponding error is thrown.
            if (!matching) {
                throw new Error("401>>You cannot log into an existing user account with these credentials you have provided");
            };
            // A user is defined (by ID and name) within a session which we create.
            request_object.session.user = {
                id : result_object.data._id_,
                name : `${result_object.data._forename_} ${result_object.data._surname_}`
            };
            // The session is modified to indicate that authentication has succeeded.
            request_object.session.isAuthenticated = true;
            // We get rid of the data in a result, to avoid unauthorised access to database fields.
            result_object.data = null;
            // We return the result object to be received back in the user router.
            return result_object;
        }

        // If an error occurs, it safely passes to the user router with a newly thrown error.
        catch (error_login) {
            throw new Error(error_login.message);
        };
    };


};




// We export our user service. The user router can now call its functions inside any given route.
module.exports = {user_service};
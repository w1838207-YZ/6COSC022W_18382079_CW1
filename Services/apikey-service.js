// This file, 'apikey-service.js', is responsible for handling the business logic of our Node.js application which is related to API keys.




// We import a required DAO class we created in a relevant folder elsewhere.
// Its functions handle database operations linked to API keys on our app.
const {apikey_dao} = require("../DAOs/apikey-dao");

// We install and import the 'uuid' package/module.
// It let us make universally unique identifiers, which is useful for making API keys.
const {v4:uuidv4} = require("uuid");




// A new class is created for the API key service of our Node.js application.
// Its operations define how we want to process API keys outside of a DAO class.
class apikey_service {


    // We use a constructor when creating an object of this class.
    constructor () {

        // We make an instance of the imported API key DAO class, via its constructor.
        this.apikey_dao = new apikey_dao();

    };


    // We define an asynchronous function that generates a new API key for a user.
    async generate(user_ID) {

        // Our app tries to generate a new API key value, and generate a new record for such within our database.
        try {
            const key_value = uuidv4();
            const result_object = await this.apikey_dao.create_apikey(user_ID,key_value);
            return result_object;
        }

        // If an error occurs, it safely passes to the API key router with a newly thrown error.
        catch (error_generate) {
            throw new Error(error_generate.message);
        };
        
    };


    // We define an asynchronous function that gets one existing API key belonging to a user.
    async retrieve_individual_user_key(key_value,user_ID) {

        // Our app tries to access an existing API key from within our database.
        try {
            const result_object = await this.apikey_dao.get_apikey_by_key_value(key_value,user_ID);
            return result_object;
        }

        // If an error occurs, it safely passes to the API key router with a newly thrown error.
        catch (error_retrieve) {
            throw new Error(error_retrieve.message);
        };

    };


};




// We export our API key service. The API key router can now call its functions inside any given route.
module.exports = {apikey_service};
// This file, 'authenticate-apikey.js', is responsible for protecting routes to only be accessible by users with a valid API key.




// We import a required service we created in a relevant folder elsewhere.
// Its functions handle business logic linked to API keys within our app.
const {apikey_service} = require("../Services/apikey-service");

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");




// We create a function which can check if an API key belonging to a signed in user has been given as part of a request.
// This middleware acts as route security, so that some routes are only accessible by a users with a valid API key.
const authenticate_apikey = async (request_object,response_object,next_object) => {

    // The value of a supplied API key is accessed from a request header.
    const key_value = request_object.header("API-Key-CW1");

    // A check is made for if a user has not supplied any API key values.
    if (!key_value) {
        // If no API key is provided, a custom response is made detailing that a user hasn't done so.
        const response_fail = await create_response(false,null,"You have not supplied any API key value as part of your request");
        // Said custom response is then sent back to the route.
        return response_object.status(401).json(response_fail);
    };

    // We make an instance of the imported API key service, via its constructor.
    this.apikey_service = new apikey_service();
    
    // Our app tries to perform a series of operations.
    try {
        // Our app checks if a user owns in our database the API key value that they have provided.
        const result_object = await this.apikey_service.retrieve_individual_user_key(key_value,request_object.session.user.id);
        // Our app checks if a returned API key is valid, returning a custom error response if it's not.
        if (result_object.data._is_active_!=1) {
            const response_fail = await create_response(false,null,"You have not supplied a valid *and* active API key you own as part of your request");
            return response_object.status(401).json(response_fail);
        };
        // If the provided API key does belong to the user and ia active, then we pass through this middleware with no action taking place.
        next_object();
    }

    // If an error occurs, so do another series of operations.
    catch (error_validate) {
        // The error code and details are extracted from a thrown error.
        const error_string = error_validate.message;
        const error_code = Number(error_string.split(">>")[0]);
        const error_details = error_string.split(">>")[1];
        // A custom error response is created.
        const response_error = await create_response(false,null,error_details);
        // Our app decides if a response needs a status code for an internal failure.
        if (error_code===500) {
            response_object.status(500).json(response_error);
        }
        // Our app later decides if a response needs a code for a user not authorised.
        else if (error_code===401) {
            response_object.status(401).json(response_error);
        };
    };

};




// We export our middleware function. Now routers can use it to protect routes from unauthorised access.
module.exports = {authenticate_apikey};
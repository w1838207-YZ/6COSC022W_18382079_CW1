// This file, 'apikey-routes.js', is responsible for grouping specifically routes related to API keys.




// We install and import the 'express' package/module.
// It allows us to create a router for our Node.js application.
const express = require("express");

// We create an object of the 'Router' class.
// This is what our API key route(s) will be attached to.
const apikey_router = express.Router();

// We import a required service we created in a relevant folder elsewhere.
// Its functions handle business logic linked to API keys within our app.
const {apikey_service} = require("../Services/apikey-service");

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");

// We import a middleware function we created in a relevant folder.
// It checks whether a user has a session active (i.e. after logging into an account).
const {check_session} = require("../Middleware/session-middleware");




// We design a route for a HTTP 'Post' request.
// We also protect said route via a session middleware function.
// We call it when a user tries to generate an API key for their account in our app.
apikey_router.post("/generate", check_session, async(request_object,response_object) => {

    // We make an instance of the imported API key service, via its constructor.
    this.apikey_service = new apikey_service();

    // Our app tries making a new API key for a user via a related service operation.
    try {
        const result_object = await this.apikey_service.generate(request_object.session.user.id);
        response_object.status(201).json(result_object);
    }

    // If an error occurs, it is caught & safely presented via a custom response.
    catch (error_generate) {
        const error_string = error_generate.message;
        const error_code = Number(error_string.split(">>")[0]);
        const error_details = error_string.split(">>")[1];
        const response_error = await create_response(false,null,error_details);
        if (error_code===500) {
            response_object.status(500).json(response_error);
        }
        else if (error_code===401) {
            response_object.status(401).json(response_error);
        };
    }

    // The route operations run only after we pass through the above middleware (i.e. an active session is found to exist).

});




// This skeleton is for a 'Put' route. It would have been used to activate an API key.
// However it is unimplemented in this submission, and so does nothing.
apikey_router.put("/activate/:id?", check_session, async(request_object,response_object) => {});




// We export our API key router. The index file can now import it to link to our app.
module.exports = {apikey_router};
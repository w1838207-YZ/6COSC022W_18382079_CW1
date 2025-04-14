// This file, 'apikey-routes.js', is responsible for grouping specifically routes related to API keys.




// We install and import the 'express' package/module.
// It allows us to create a router for our Node.js application.
const express = require("express");

// We create an object of the 'Router' class.
// This is what our API key route(s) will be attached to.
const apikey_router = express.Router();

// We import a required service we created in a relevant folder elsewhere.
// Its functions handle business logic linked to .
const {apikey_service} = require("../Services/apikey-service");

// We import a middleware function we created in a relevant folder.
// It checks whether a user has a session active (i.e. after logging into an account).
const {check_session} = require("../Middleware/session-middleware");

// We import a middleware function we created in a relevant folder.
// It checks if an API key is included in a request and authenticates it for validity.
const {authenticate_apikey} = require("../Middleware/authenticate-apikey");




// We design a route for a HTTP 'Post' request.
// We also protect said route via a session middleware function.
// We call it when a user tries to generate an API key for their account in our app.
apikey_router.post("/generate", check_session, async(request_object,response_object) => {

    // We make an instance of the imported API key service, via its constructor.
    this.apikey_service = new apikey_service();

    // We run a service operation to try and generate an API key for a user, that is associated with an existing account that they are logged in with.
    const result_object = await this.apikey_service.generate(request_object);

    // We return a response to the above operation in JSON format.
    response_object.json(result_object);

    // The route operations run only after we pass through the above middleware (i.e. an active session is found to exist).

});




// We design a route for a HTTP 'Get' request.
// We also protect said route via an API key middleware function. 
// We call it to test via authentication whether an API key (if included) is valid.
apikey_router.get("/test", authenticate_apikey, async(request_object,response_object) => {
    // We receive a JSON response only after our route's operation passes through the middleware function (i.e. after authentication finds a featured API key is valid).
    response_object.json("Route has been validated and Key is valid");
});




// We export our API key router. The index file can now import it to link to our app.
module.exports = {apikey_router};
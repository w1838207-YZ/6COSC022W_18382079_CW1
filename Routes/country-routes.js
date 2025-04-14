// This file, 'country-routes.js', is responsible for grouping specifically routes related to countries' information.




// We install and import the 'express' package/module.
// It allows us to create a router for our Node.js application.
const express = require("express");

// We create an object of the 'Router' class.
// This is what our country route(s) will be attached to.
const country_router = express.Router();

// We import a required service we created in a relevant folder elsewhere.
// Its functions handle business logic linked to the 'REST Countries' API.
const {country_service} = require("../Services/country-service");

// We import a middleware function we created in a relevant folder.
// It checks whether a user has a session active (i.e. after logging into an account).
const {check_session} = require("../Middleware/session-middleware");

// We import a middleware function we created in a relevant folder.
// It checks if an API key is included in a request and authenticates it for validity.
const {authenticate_apikey} = require("../Middleware/authenticate-apikey");




// We design a route for a HTTP 'Get' request - it has room for 1 argument at its end.
// It's also protected by 2 middleware functions (they involve sessions and API keys).
// We use it to get essential country information from REST Countries.
country_router.get("/get/:argument", check_session, authenticate_apikey, async(request_object,response_object) => {
    
    // We make an instance of the imported country service, via its constructor.
    this.country_service = new country_service();

    // We check the value supplied for the route's argument.
    // In one case, we run a service operation to get information for every country recorded in REST Countries.
    // Otherwise, we run an operation to get information for an individual country recorded in REST Countries.
    if (request_object.params.argument.toUpperCase()==="ALL") {
        const result_object = await this.country_service.get_all_countries();
        response_object.json(result_object);
    }
    else {
        const result_object = await this.country_service.get_country_by_name(request_object.params.argument);
        response_object.json(result_object);
    };

    // The route operations run only after we pass through both middlewares (i.e. an active session exists AND a valid API key is included in a request to the route).
    
});




// We export our country router. The index file can now import it to link to our app.
module.exports = {country_router};
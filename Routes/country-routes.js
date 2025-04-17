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

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");

// We import a middleware function we created in a relevant folder.
// It checks whether a user has a session active (i.e. after logging into an account).
const {check_session} = require("../Middleware/session-middleware");

// We import a middleware function we created in a relevant folder.
// It checks if an API key is included in a request and authenticates it for validity.
const {authenticate_apikey} = require("../Middleware/authenticate-apikey");




// We design a route for a HTTP 'Get' request - it has room for 1 argument at its end.
// It's also protected by 2 middleware functions (they involve sessions and API keys).
// We use it to get essential country information from REST Countries.
country_router.get("/get/:argument?", check_session, authenticate_apikey, async(request_object,response_object) => {
    
    // We make an instance of the imported country service, via its constructor.
    this.country_service = new country_service();

    // We then check what value was supplied for the route's argument.

    // If no argument is supplied (for country name to search with), an error response is given immediately.
    if (!request_object.params.argument) {
        const response_error = await create_response(false,null,"This app cannot fetch any data entries because no country name has been supplied to search with");
        response_object.status(404).json(response_error);
    }

    // If the argument specifies the extraction of data for all countries, our app will try to perform the related service operation.
    else {
        if (request_object.params.argument.toUpperCase()==="ALL") {
            try {
                const result_object = await this.country_service.retrieve_every_countries_data();
                response_object.status(200).json(result_object);
            }
            catch (error_get) {
                const response_error = await create_response(false,null,error_get.message);
                response_object.status(500).json(response_error);
            };
        }
    
    // If another value is given for the route argument, our app will try to perform data extraction for an individual country via the related service operation.
        else {
            try {
                const result_object = await this.country_service.retrieve_single_country_data(request_object.params.argument);
                response_object.status(200).json(result_object);
            }
            catch (error_get) {
                const error_string = error_get.message;
                const error_code = Number(error_string.split(">>")[0]);
                const error_details = error_string.split(">>")[1];
                const response_error = await create_response(false,null,error_details);
                if (error_code===500) {
                    response_object.status(500).json(response_error);
                }
                else if (error_code===404) {
                    response_object.status(404).json(response_error);
                };
            };
        };
    };

    // The route operations run only after we pass through both middlewares (i.e. an active session exists AND a valid API key is included in a request to the route).
    
});




// We export our country router. The index file can now import it to link to our app.
module.exports = {country_router};
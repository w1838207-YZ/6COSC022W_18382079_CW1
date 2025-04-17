// This file, 'user-routes.js', is responsible for grouping specifically routes related to user accounts.




// We install and import the 'express' package/module.
// It allows us to create a router for our Node.js application.
const express = require("express");

// We create an object of the 'Router' class.
// This is what our user route(s) will be attached to.
const user_router = express.Router();

// We import a required service we created in a relevant folder elsewhere.
// Its functions handle business logic linked to user accounts on our app.
const {user_service} = require("../Services/user-service");

// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");




// We design a route for a HTTP 'Get' request.
// We call it to load an EJS view in a browser, for a register page.
user_router.get("/register", async(request_object,response_object) => {
    
    // The route's response is used to display said view on the screen.
    response_object.render("view-register");

});




// We design a route for a HTTP 'Post' request.
// We call it when a user tries to register a new account on our app.
user_router.post("/register", async(request_object,response_object) => {

    // We make an instance of the imported user service, via its constructor.
    this.user_service = new user_service();

    // Our app tries to create a new account with the related service operation.
    try {
        const result_object = await this.user_service.register(request_object);
        response_object.status(201).json(result_object);
    }

    // If an error occurs, it is caught & safely presented via a custom response.
    catch (error_register) {
        const error_string = error_register.message;
        const error_code = Number(error_string.split(">>")[0]);
        const error_details = error_string.split(">>")[1];
        const response_error = await create_response(false,null,error_details);
        if (error_code===500) {
            response_object.status(500).json(response_error);
        }
        else if (error_code===401) {
            response_object.status(401).json(response_error);
        };
    };

});




// We design a 'Get' route, which loads an EJS view for a login page.
// Unfortunately for this submission, the view is not implemented fully.
user_router.get("/login", async(request_object,response_object) => {
    
    // The route's response is used to display said view on the screen.
    response_object.render("view-login");

});




// We design a route for a HTTP 'Post' request.
// We call it when a user tries to log into our app with an existing account.
user_router.post("/login", async(request_object,response_object) => {

    // We make an instance of the imported user service, via its constructor.
    this.user_service = new user_service();

    // Our app tries to log a user into an account with the related service operation.
    try {
        const result_object = await this.user_service.login(request_object);
        response_object.status(200).json(result_object);
    }

    // If an error occurs, it is caught & safely presented via a custom response.
    catch (error_login) {
        const error_string = error_login.message;
        const error_code = Number(error_string.split(">>")[0]);
        const error_details = error_string.split(">>")[1];
        const response_error = await create_response(false,null,error_details);
        if (error_code===500) {
            response_object.status(500).json(response_error);
        }
        else if (error_code===401) {
            response_object.status(401).json(response_error);
        };
    };

});




// We design a 'Get' route, which loads an EJS view for a dashboard page.
// Unfortunately for this submission, the view is not implemented fully.
user_router.get("/dashboard", async(request_object,response_object) => {
    
    // The route's response is used to display said view on the screen.
    response_object.render("view-dashboard");

});




// This skeleton is for a 'Post' route, which would have been used for the dashboard.
// However it is unimplemented in this submission, and so does nothing.
user_router.post("/dashboard", async(request_object,response_object) => {});

// We design a 'Get' route, which would have been used when a user tries logging out.
// However it is unimplemented in this submission, and so does nothing.
user_router.get("/logout", async(request_object,response_object) => {});

// We design a 'Post' route, which would have been used when a user tries logging out.
// However it is unimplemented in this submission, and so does nothing.
user_router.post("/logout", async(request_object,response_object) => {});




// We export our user router. The index file can now import it to link to our app.
module.exports = {user_router};
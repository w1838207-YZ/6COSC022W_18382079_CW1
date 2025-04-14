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

// We import a middleware function we created in a relevant folder.
// It checks whether a user has a session active (i.e. after logging into an account).
const {check_session} = require("../Middleware/session-middleware");




//
//
user_router.get("/register", async(request_object,response_object) => {

    //
    response_object.render("register");

});




// We design a route for a HTTP 'Post' request.
// We call it when a user tries to register a new account on our app.
user_router.post("/register", async(request_object,response_object) => {

    // We make an instance of the imported user service, via its constructor.
    this.user_service = new user_service();

    // We run a service operation to try and register a new user account into our app's database, using supplied credentials.
    const result_object = await this.user_service.register(request_object);

    // We return a response to the above operation in JSON format.
    response_object.json(result_object);

});




//
//
user_router.get("/login", async(request_object,response_object) => {});




// We design a route for a HTTP 'Post' request.
// We call it when a user tries to logo into our app with an existing account.
user_router.post("/login", async(request_object,response_object) => {

    // We make an instance of the imported user service, via its constructor.
    this.user_service = new user_service();

    // We run a service operation to try and log a user into an existing account stored on our app's database, using supplied credentials.
    const result_object = await this.user_service.login(request_object);

    // We return a response to the above operation in JSON format.
    response_object.json(result_object);

});




// We set a route for a HTTP 'Get' request.
// We also protect said route via a session middleware function.
// We call it to test whether a user session works after its activation.
user_router.get("/testSession", check_session, async(request_object,response_object) => {
    // We receive a JSON response only after our route's operation passes through the middleware function (i.e. only after confirming an active session exists).
    response_object.json("User is logged in and authenticated");
});




//
//
user_router.get("/dashboard", check_session, async(request_object,response_object) => {});




//
//
user_router.post("/dashboard", check_session, async(request_object,response_object) => {});




//
//
user_router.get("/logout", async(request_object,response_object) => {});




//
//
user_router.post("/logout", async(request_object,response_object) => {});




// We export our user router. The index file can now import it to link to our app.
module.exports = {user_router};
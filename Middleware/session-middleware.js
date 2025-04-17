// This file, 'session-middleware.js', is responsible protecting routes to only be accessible by users with an active session.




// We import a utility function we created in a relevant folder elsewhere.
// It lets specialised responses be made, based on the structure we defined.
const {create_response} = require("../Utilities/create-response");




// We create a function which can check if an active user session exists.
// This middleware acts as route security, so that some routes are only accessible by a user who is logged in.
const check_session = async (request_object,response_object,next_object) => {
    
    // A check is made, to see if a session is authenticated or not.
    if (!request_object.session.isAuthenticated) {
        // If a session is not active, a custom response is made detailing that a user isn't logged in yet.
        const response_fail = await create_response(false,null,"You do not have an active session because you're yet to log in");
        // Said custom response is then sent back to the route.
        return response_object.status(401).json(response_fail);
    };

    // If an active session does exist though, then we pass through this middleware with no action taking place.
    next_object();

};




// We export our middleware function. Now routers can use it to protect routes from unauthorised access.
module.exports = {check_session};
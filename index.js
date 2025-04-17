// This file, 'index.js', is the starting point of our application/project.




// We install and import the 'express' package/module.
// It allows us to create a web server for our Node.js application.
const express = require("express");

// We install and import the 'express-session' package/module.
// It allows us to create and use sessions within our Node.js application.
const session = require("express-session");

// We install and import the 'path' package/module.
// It allows us to locate static assets within our Node.js application.
const path = require("path");

// We install and import the 'cors' package/module.
// It can allow servers hosted on other origins to interact with our application.
// It's ineffective here because our front and back end are hosted at the same origin.
const cors = require("cors");




// We create an object of express - it represents our Node.js application.
// We refer to 'app' throughout our work.
const app = express();




// We ensure via middleware that our app can parse data into JSON objects.
// This lets us access & make use of data in a HTTP 'Post' request's body.
app.use(express.json());

// We configure our app to use Embedded JavaScript as what renders content from pages.
app.set("view engine", "ejs");

// We configure our app to locate the folder that page views are stored in.
app.set("views", "./Views");

// We configure our app to know the name of the folder that static assets exist in.
app.use(express.static("Public"));

// We configure our app to locate the folder that static assets are stored in.
app.use(express.static(path.join(__dirname,"Public")));

// We configure our app to allow requests from any origin.
// As said before, it's ineffective. Our app's security also may be placed under risk, if some origin is malicious.
app.use(cors());




// We design the structure of sessions which are used in this app.
app.use(session({
    secret : "my_secret_santa_" ,  // A secret key prevents tampering of session data.
    resave : false ,               // This maintains session cookies between requests.
    saveUninitialized : false ,    // Empty sessions with no property can't be saved.
    cookie : {                     // Here the cookie structure is defined.
        secure:false,              // This lets a cookie be sent over HTTPS and HTTP.
        httpOnly:true,             // This makes cookies unmodifiable by JavaScript.
        maxAge:1000*60*60*24       // This makes a cookie last a maximum of 24 hours.
    }
}));




// We import a router which groups all the routes that handle countries' information.
// We configure our app, so it is now compatible with said country routes.
const {country_router} = require("./Routes/country-routes");
app.use("/countries",country_router);

// We import a router which groups all the routes that handle user accounts.
// We configure our app, so it is now compatible with said user routes.
const {user_router} = require("./Routes/user-routes");
app.use("/users",user_router);

// We import a router which groups all the routes that handle API keys.
// We configure our app, so it is now compatible with said API key routes.
const {apikey_router} = require("./Routes/apikey-routes");
app.use("/apikeys",apikey_router);




// We designate a computer port number.
// Our app's server will listen for and respond to user requests on this port.
const PORT_NUMBER = 5000;

// We tell our app to listen to the aforementioned port for requests.
// We are informed about the app server starting and whether any errors occur.
app.listen(PORT_NUMBER, () => {
    console.log(`^\n> Our app's server successfully is listening on port:  ${PORT_NUMBER}`);
})
.on("error", function(error_listen) {
    if (error_listen.code==="EADDRINUSE") {
        console.log("^\n>  Error! The chosen port is already used by another process");
    }
    else {
        console.log("^\n>  Error! Our app's server failed to start for an unknown reason");
    };
});
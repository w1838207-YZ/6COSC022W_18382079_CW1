// This file, 'index.js', is the starting point of our application/project.




// We install and import the 'express' package/module.
// It allows us to create a web server for our Node.js application.
const express = require("express");

// We install and import the 'express-session' package/module.
// It allows us to create and use sessions within our Node.js application.
const session = require("express-session");

//
//
const path = require("path");




// We create an object of express - it represents our Node.js application.
// We refer to 'app' throughout our work.
const app = express();

// We ensure via middleware that our app can parse data into JSON objects.
// This lets us access & make use of data in a HTTP 'Post' request's body.
app.use(express.json());

//
//
app.set("view engine", "ejs");

//
//
app.set("views", "./Views");

//
//
app.use(express.static(path.join(__dirname, 'Public')));




//
app.use(session({
    secret : "my_secret_santa_",  //
    resave : false,               //
    saveUninitialized : false,    //
    cookie : {                    //
        secure:false,             //
        httpOnly:true,            //
        maxAge:1000*60*60*24      //
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
    console.log(`^\n>  Hello World!`);
})
.on("error", function(error_listen) {
    if (error_listen.code==="EADDRINUSE") {
        console.log("^\n>  Error! A");
    }
    else {
        console.log("^\n>  Error! B");
    };
});
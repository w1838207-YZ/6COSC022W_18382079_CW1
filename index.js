//
const express = require("express")

//
const app = express()

//
app.use(express.json())

//
const user_routes = require("./Routes/user-routes")
app.use("/api/users",user_routes)

//
const country_routes = require("./Routes/country-routes")
app.use("/api/countries",country_routes)

//
const apikey_routes = require("./Routes/apikey_routes")
app.use("/api/apikeys",apikey_routes)

//
const PORT_NUMBER = 5000




//
//app.get("/", async(request_object,response_object) => {})




//
app.listen(PORT_NUMBER, (error_listen) => {
    if (error_listen) {
        console.error(error_listen)
    }
    else {
        console.log(`The server has now started. It's listening on port: ${PORT_NUMBER}`)
    }
})
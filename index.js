//
const express = require("express")

//
const app = express()
//
app.use(express.json())

//
const PORT_NUMBER = 5000


//



//
app.listen(PORT_NUMBER,(listen_error)=>{
    if (listen_error) {  //
        console.error(listen_error)
    }
    else {  //
        console.log("The server has now started. It's listening on port: ",PORT_NUMBER)
    }
})
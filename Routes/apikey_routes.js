//
const express = require("express")

//
const apikey_router = express.Router()

//
const apikey_service = require("../Services/apikey-service")




//
apikey_router.get("/generate", async(request_object,response_object) => {
    this.apikey_service = new apikey_service()
    const result_object = await this.apikey_service.create_apikey()
    response_object.json(result_object)
})




//
module.exports = apikey_router
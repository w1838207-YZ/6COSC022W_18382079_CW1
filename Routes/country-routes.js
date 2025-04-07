//
const express = require("express")

//
const country_router = express.Router()

//
const country_service = require("../Services/country-service")




//
country_router.get("/get/all", async(request_object,response_object) => {
    this.country_service = new country_service()
    const result_object = await this.country_service.get_all_countries()
    response_object.json(result_object)
})

//
country_router.get("/get/:name", async(request_object,response_object) => {
    this.country_service = new country_service()
    const result_object = await this.country_service.get_country_by_name(request_object.params.name)
    response_object.json(result_object)
})




//
module.exports = country_router
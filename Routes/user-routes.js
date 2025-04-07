//
const express = require("express")

//
const user_router = express.Router()

//
const user_service = require("../Services/user-service")




//
user_router.post("/register", async(request_object,response_object) => {
    this.user_service = new user_service()
    const result_object = await this.user_service.create_user(request_object)
    response_object.json(result_object)
})

//
user_router.post("/login", async(request_object,response_object) => {
    this.user_service = new user_service()
    const result_object = await this.user_service.get_user_by_email(request_object.params.email)
    response_object.json(result_object)
})

//
//user_router.get("/test", async(request_object,response_object) => {})




//
module.exports = user_router
//
//
const {apikey_service} = require("../Services/apikey-service");




//
//
const authenticate_apikey = async (request_object,response_object,next_object) => {


    //
    const key = request_object.header("API-Key-CW1");


    //
    if (!key) {
        //
        return response_object.status(401).json({error:"Missing API Key"});
    };


    //
    this.apikey_service = new apikey_service();


    //
    try {
        
        //
        const result_object = await this.apikey_service.validate(key);

        //
        console.log(result_object)

        //
        if (!result_object.success) {
            return response_object.status(403).json({error:"Invalid Key"})
        };

        //
        if (!(result_object.data==1)) {}

        //
        request_object.key = result_object.data;

        //
        next_object();

    }


    //
    catch (error_validate) {
        //
        response_object.status(500).json({error:"Error! 12/04 C"});
    };


};




//
module.exports = {authenticate_apikey};
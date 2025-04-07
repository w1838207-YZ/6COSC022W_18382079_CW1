//
const create_response = async (success,data=null,error=null) => {
    return {
        success,
        data,
        error:error?.message || error
    }
}




//
module.exports = {create_response}
//
//
const check_session = async (request_object,response_object,next_object) => {
    
    //
    if (!request_object.session.isAuthenticated) {
        //
        return response_object.status(401).json({error : "User is not logged in"});
    };

    //
    next_object();

};




//
module.exports = {check_session};
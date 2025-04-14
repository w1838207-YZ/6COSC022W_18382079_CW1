// This file, 'create-response.js', is responsible for facilitating a consistent format of messages that go up to as far a distance (in our Node.js application) as between a DAO file and a route.




// We create a function which can generate a specialised response. It is in JSON form.
// The definition in said function lets us specify success, data, and error values.
const create_response = async (success,data=null,error=null) => {
    return {
        success,
        data,
        error:error?.message || error
    };
};




// We export our function. Other files can now import it & make specialised responses.
module.exports = {create_response};
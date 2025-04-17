// This file, 'view-script-register.js', is responsible for allowing users to register a new account through a page view.




// We access a submit button from the register page, by id value.
// The main functionality of this script runs when said field is clicked.
document.getElementById("register").addEventListener("click", async(event_object) => {


    // Our app tries to perform two main overarching functions.
    try {

        // Our app first tries to access data supplied by a user in a HTML/EJS form.
        const data_for_request_body = await validate_data_from_view();
        
        // Then our app tries using said supplied data to register a new user account.
        const response_object = await register_user_via_service(data_for_request_body);
        
    }


    // If an error occurs, we try to display its message on the register page through a browser alert message.
    catch (error_register) {    
        alert(error_register.message);
    };


});




// We define a first asynchronous function.
// It validates data supplied in the register page view, returning it if successful.
async function validate_data_from_view() {

    
    // Our app tries to perform a series of operations.
    try {
        
        // Form fields are accessed by ID, and their values are stored into variables.
        const forename = document.getElementById("forename").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const password_verify = document.getElementById("verify").value.trim();
        
        // If a user misses any credentials, a corresponding error is thrown.
        if (!forename||!surname||!email||!password||!password_verify) {
            throw new Error("Users must provide a unique email, password, and first and last names to create an account");
        };
        
        // If a user enters a value for an email which does not follow a valid pattern, a corresponding error is thrown.
        const email_valid_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_valid_pattern.test(email)) {
            throw new Error("The provided email does not follow a valid email pattern");
        };
        
        // If a user did not enter the same value in the 'password' and 'verify password' fields, a corresponding error is thrown.
        if (password!=password_verify) {
            throw new Error("The provided password has not been correctly verified");
        };
        
        // If all is well, the user-supplied data is contained inside a JSON object.
        const data_for_request_body = {
            "email" : email,
            "password" : password,
            "forename" : forename,
            "surname" : surname
        };
        
        // The above JSON object is returned by the function.
        return data_for_request_body;

    }


    // If an error occurs, it is safely rethrown within this script file.
    catch (error_validate) {
        throw new Error(error_validate.message);
    };

    
};




// We define a first asynchronous function.
// The data supplied in the register page (by a user) is passed as an argument.
async function register_user_via_service(data_for_request_body) {

    // Options are set for a fetch - they describe a POST request where the supplied JSON data exists inside its body.
    const fetch_options = {
        method : "POST",
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify(data_for_request_body)
    };

    // Our app tries to fetch using the endpoint for registering a new user.
    const fetch_response = await fetch("http://localhost:5000/users/register", fetch_options);

    // Our app tries converting the output of the fetch in JSON format.
    const fetch_response_json = await fetch_response.json();

    // A corresponding error is thrown if any errors occur.
    // It is noteworthy that, in this submission, this error gets thrown even though the database operation of creating a new user works without a problem.
    if (!fetch_response.ok||!fetch_response_json.success) {
        throw new Error(fetch_response||"Failed to register user. Please try again later.");
    };

    // An alert message is created, indicating that account registration succeeded.
    // It is noteworthy that, in this submission, this alert is never called to run.
    alert("No errors here~");

};
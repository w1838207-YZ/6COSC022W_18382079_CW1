// This file, 'bcrypt-utility.js', is responsible for housing functionalities in our Node.js application which rely on encryption to work.




// We install and import the 'bcrypt' package/module.
// It allows us to use functions that encrypt via hashing, or compare hash values.
const bcrypt = require("bcrypt");




// We create a function which can generate a hash on a salted value.
// It can secure credentials, like protecting passwords against rainbow table attacks.
const generate_hash = async (string_input) => {

    // We specify a random string's size, that gets added to a string (e.g. password).
    const salt_rounds = 10;
    
    // We generate a salt based on the above size. It 'adds spice' to a common string.
    const salt = await bcrypt.genSalt(salt_rounds);
    
    // We generate a hash. The added salt to the above string will influence the hash.
    const salted_and_hashed = await bcrypt.hash(string_input,salt);
    
    // We return the hash for the salted string.
    // If the string is a user password, its hash is now less likely to appear in a rainbow table even if the password itself is common.
    return salted_and_hashed;

};




// We create a function which can verify a password value.
// This is useful when a user enters a password on a login page, to do authentication.
const verify_password = async (form_password,database_password) => {

    // The plaintext password that a user enters (i.e. on a form) is compared to the hashed value of a password stored in a user record (from our app's SQL database).
    const matching = await bcrypt.compare(form_password,database_password);

    // We return the result of this comparison.
    // It indicates whether the user has passed their attempt authentication.
    return matching

};




// We export all functions above, to be imported by other files that need to use them.
module.exports = {generate_hash,verify_password};
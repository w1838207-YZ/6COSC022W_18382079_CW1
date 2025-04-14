// This file, 'sql-connection.js', is responsible for establishing a connection between our Node.js application and our project database.




// We install and import the 'sqlite3' package/module.
// It lets us establish a connection with, and perform queries on, an sqlite database.
const sqlite_db = require("sqlite3");




// We create a pool object representing a collection of open connections to databases.
// We use this pool to interact with our database, for all our queries in our project.
// We're told if our app connected to our database or if any errors occurred.
const connection_pool = new sqlite_db.Database("Databases/my-database-cw1.db", () => {
    console.log(">  Hello World! The Sequel");
})
.on("error", function(error_connect) {
    console.log(">  Error! The Sequel");
});




// We export our pool object. Other files can now import it to gain database access.
module.exports = {connection_pool};
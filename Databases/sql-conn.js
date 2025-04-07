//
const db = require("sqlite3")




//
const pool = new db.Database("./Databases/my-database-cw1.db", (error_connect) => {
    if (error_connect) {
        console.error(error_connect)
    }
    else {
        console.log("The database is now connected.")
    }
})




//
module.exports = pool
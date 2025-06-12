const mysql = require("mysql2");

//Connect to database
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root", //Modify to your database username
    password: "1234", //Modify to your database password
    database: "database_tfg"
})

db.connect(function (error) {
    //Check connection to database
    if (error) {
        console.error("Error connecting to the database:", error.message);
        return;
    }
    console.log("Connected to the database");
})

module.exports = db;
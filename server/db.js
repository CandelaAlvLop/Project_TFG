const mysql = require('mysql2'); 

const db = mysql.createConnection({ //Connect to database
    host: '127.0.0.1',
    user: 'root',
    password: '1234abcd',
    database: 'database_tfg'
})

db.connect(function(error){
    //Check connection to database
    if (error) {
        console.error('Error connecting to the database:', error.message);
        return;
    }
    console.log('Connected to the database');
})

module.exports = db;

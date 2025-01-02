const mysql = require('mysql2'); 
const express = require('express') //instance of the express framework
const app = express() //this allows to make API requests, initialize our server, etc


const db = mysql.createConnection({ //Connect to database
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'database_tfg'
})

db.connect(function(error){
    //Check connection to database
    if (error) {
        console.error('Error connecting to the database:', error.message);
        return;
    }
    console.log('Connected to the database');
    
    //Query table users
    db.query("SELECT * FROM users", function (error, result) {
        if (error) {
            console.error('Error executing query:', error.message);
            return;
        }
        console.log('Query results', result); 
    });
})

//Route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});

// API Route for Users
app.get('/api/users', (req, res) => {
    db.query("SELECT * FROM users", (error, result) => {
        if (error) {
            console.error('Error fetching users:', error.message);
            res.status(500).json({ error: 'Database query error' }); //Server Error
            return;
        }
        res.status(200).json(result); //Success
    });
});


//Start API, you can use any port but it must be different than our react application
app.listen(3001, () => {
    //Pass anonymous function that is going to run whenever the server starts, to get a confirmation that the server is running
    console.log("Server running on port 3001")
}); 
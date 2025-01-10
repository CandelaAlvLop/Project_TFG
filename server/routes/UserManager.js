const express = require('express');
const router = express.Router();
const db = require('../db');


router.post("/register", (req, res) => {
    const username = req.body.username
    const DNI = req.body.DNI
    const password = req.body.password
    
    db.query(
        "INSERT INTO users (username,DNI,password) VALUES (?,?,?)", 
        [username, DNI, password], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
            console.log('User registered succesfully:', result);
            }
        }
    ); 
});

router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password],  
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } 
            if (result.length > 0) { //Check if combination is in database
                console.log("User logged succesfully:", result);
                res.send(result[0]);
                console.log("Redirecting to Dashboard");
            } else {
                console.log("Wrong username or password");
                res.send({message: "Wrong username or password"})
            }
        }
    ); 
});

module.exports = router;
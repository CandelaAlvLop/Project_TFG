const express = require('express');
const router = express.Router();
const db = require('../db');


router.post("/register", (req, res) => {
    const username = req.body.username
    const DNI = req.body.DNI
    const password = req.body.password
    
    db.query(
        "INSERT INTO users (username,password) VALUES (?,?)", 
        [username, password], 
        (err, result) => {
            console.log(err);
        }
    ); 
});

module.exports = router;
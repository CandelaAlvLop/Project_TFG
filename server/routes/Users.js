const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", (req, res) => { //No need to specify /users as it is provided in index.js in the Route
    db.query("SELECT * FROM users", (error, result) => {
        if (error) {
            console.error('Error fetching users:', error.message);
            res.status(500).json({ error: 'Database query error' }); //Server Error
            return;
        }
        res.status(200).json(result); //Success
        console.log('Users fetched:', result); 
    });
});
    
router.post("/", (req, res) => {
    res.send('POST request to /users');
});

module.exports = router;
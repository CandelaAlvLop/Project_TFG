const express = require("express");
const router = express.Router();
const db = require("../db");

const name_surnamePattern = /^[A-Z][a-z]{1,9}$/;
const usernamePattern = /^.{3,10}$/;
const DNIPattern = /^[0-9]{8}[A-Z]$/;
const emailPattern = /^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[\S]{6,}$/;


// ------------------------------- REGISTER -------------------------------
//Register User
router.post("/register", (req, res) => {
    const { name, surname, username, DNI, email, password, type } = req.body;

    //Check no parameter is empty
    if (!name || !surname || !username || !DNI || !email || !password || !type) {
        return res.status(400).send({ message: "All parameters are required" });
    }

    //Check correctness of patterns
    else if (!name_surnamePattern.test(name)) return res.status(400).send({ message: "Name must start with a capital letter and be followed by small letters, max 10 letters" });
    else if (!name_surnamePattern.test(surname)) return res.status(400).send({ message: "Surname must start with a capital letter and be followed by small letters, max 10 letters" });
    else if (!usernamePattern.test(username)) return res.status(400).send({ message: "Username must be between 3 and 10 characters" });
    else if (!DNIPattern.test(DNI)) return res.status(400).send({ message: "DNI contains 8 digits and a capital letter" });
    else if (!emailPattern.test(email)) return res.status(400).send({ message: "Not a valid email address" });
    else if (!passwordPattern.test(password)) return res.status(400).send({ message: "Password of min 6 characters, containing at least one lower and one uppercase letters, one digit and one special character" });

    //Check uniqueness of username, DNI and email in database
    db.query(
        "SELECT username, DNI, email FROM users WHERE username = ? OR DNI = ? OR email = ?",
        [username, DNI, email],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting User data" });
            }

            if (result.length > 0) {
                let uniqueValue = [];
                result.forEach(user => {
                    if (user.DNI === DNI) uniqueValue.push("DNI");
                    if (user.username === username) uniqueValue.push("username");
                    if (user.email === email) uniqueValue.push("email");
                });
                return res.status(400).send({ message: `The following fields are already taken: ${uniqueValue.join(", ")}` });
            }

            //Add user if username, DNI and email unique and patterns are correct
            db.query(
                "INSERT INTO users (name, surname, username, DNI, email, password, type) VALUES (?,?,?,?,?,?,?)",
                [name, surname, username, DNI, email, password, type],
                (err, result) => {
                    if (err) {
                        return res.status(500).send({ message: "Registration failed" });
                    } else {
                        res.status(200).send({ message: "Registration successful", userId: result.insertId, type: type });
                    }
                }
            );
        }
    );
});

// ------------------------------- LOGIN -------------------------------
//Login User
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    //Check no parameter is empty
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting User data" });
            }
            if (result.length > 0) { //Check if combination is in database
                res.status(200).send({ userId: result[0].user_id, username: result[0].username, type: result[0].type });
            } else {
                res.status(400).send({ message: "Wrong username or password" })
            }
        }
    );
});


// ------------------------------- PERSONAL DATA -------------------------------
// ------------- USER DATA -------------
//Get User
router.get("/userUpdate/:id", (req, res) => {
    const userId = req.params.id;
    db.query("SELECT * FROM users WHERE user_id = ?",
        [userId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting User data" });
            }
            res.status(200).send(result[0]);
        });
});

//Update User
router.put("/userUpdate/:id", (req, res) => {
    const userId = req.params.id;
    const { name, surname, username, DNI, email, password, type } = req.body;

    //Check no parameter is empty
    if (!name || !surname || !username || !DNI || !email || !password || !type) {
        return res.status(400).send({ message: "All parameters are required" });
    }

    //Check correctness of patterns
    else if (!name_surnamePattern.test(name)) return res.status(400).send({ message: "Name must start with a capital letter and be followed by small letters, max 10 letters" });
    else if (!name_surnamePattern.test(surname)) return res.status(400).send({ message: "Surname must start with a capital letter and be followed by small letters, max 10 letters" });
    else if (!usernamePattern.test(username)) return res.status(400).send({ message: "Username must be between 3 and 10 characters" });
    else if (!DNIPattern.test(DNI)) return res.status(400).send({ message: "DNI contains 8 digits and a capital letter" });
    else if (!emailPattern.test(email)) return res.status(400).send({ message: "Not a valid email address" });
    else if (!passwordPattern.test(password)) return res.status(400).send({ message: "Password of min 6 characters, containing at least one lower and one uppercase letters, one digit and one special character" });

    //Check uniqueness of username, DNI and email in database
    db.query(
        "SELECT user_id, username, DNI, email FROM users WHERE (username = ? OR DNI = ? OR email = ?) AND user_id != ?",
        [username, DNI, email, userId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting User data" });
            }

            if (result.length > 0) {
                let uniqueValue = [];
                result.forEach(user => {
                    if (user.DNI === DNI) uniqueValue.push("DNI");
                    if (user.username === username) uniqueValue.push("username");
                    if (user.email === email) uniqueValue.push("email");
                });
                return res.status(400).send({ message: `The following fields are already taken: ${uniqueValue.join(", ")}` });
            }

            //Add user if username, DNI and email unique and patterns are correct
            db.query("UPDATE users SET name = ?, surname = ?, username = ?, DNI = ?, email = ?, password = ?, type = ? WHERE user_id = ?",
                [name, surname, username, DNI, email, password, type, userId],
                (err) => {
                    if (err) {
                        return res.status(500).send({ message: "Error updating User data" });
                    }
                    res.status(200).send({ message: "User data updated successfully" });
                }
            );
        }
    );
});

//Save Notifications
router.post("/notification", (req, res) => {
    const { userId, notifications } = req.body;

    db.query(
        "SELECT * FROM notifications_consent WHERE user_id = ?",
        [userId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error checking existing notification consents" });
            }
            if (result.length > 0) {
                db.query(
                    "UPDATE notifications_consent SET notifications = ? WHERE user_id = ?",
                    [notifications, userId],
                    (update_err) => {
                        if (update_err) {
                            return res.status(500).send({ message: "Error updating notification consents" });
                        }
                        return res.status(200).send({ message: "Notification consents updated successfully" });
                    }
                );
            } else {
                db.query(
                    "INSERT INTO notifications_consent (user_id, notifications) VALUES (?, ?)",
                    [userId, notifications],
                    (insert_err) => {
                        if (insert_err) {
                            return res.status(500).send({ message: "Error inserting notification consents" });
                        }
                        return res.status(200).send({ message: "Notification consents inserted successfully" });
                    }
                );
            }
        }
    );
});

//Get Notifications
router.get("/notification/:userId", (req, res) => {
    const { userId } = req.params;

    db.query(
        "SELECT notifications FROM notifications_consent WHERE user_id = ?",
        [userId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting notification consents" });
            }
            if (result.length > 0 && result[0].notifications) {
                res.status(200).send({ notifications: result[0].notifications.split(",") });
            } else {
                res.status(200).send({ notifications: [] });
            }
        }
    );
});

module.exports = router;
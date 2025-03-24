const express = require('express');
const router = express.Router();
const db = require('../db');

const name_surnamePattern = /^[A-Z][a-z]{1,9}$/;
const usernamePattern = /^.{2,10}$/;
const DNIPattern = /^[0-9]{8}[A-Z]$/;
const emailPattern = /^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{6,}$/;

const propertyName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,14}$/;
const size_Pattern = /^[1-9][0-9]{0,5}$/;
const buildingAge_Pattern = /^[0-9]{0,4}$/;
const district_Pattern = /^[0-9]{5}$/;
const quantity_Pattern = /^[1-9][0-9]{0,2}$/;
const income_Pattern = /^[1-9][0-9]{0,6}$/;
const consumption_Pattern = /^[1-9][0-9]{0,4}$/;

// ------------------------------- REGISTER -------------------------------
//Register User
router.post("/register", (req, res) => {
    const {name, surname, username, DNI, email, password, type} = req.body;
    
    //Check no parameter is empty
    if (!name || !surname || !username || !DNI || !email || !password || !type) {
        return res.status(400).send({message: "All parameters are required"});
    }

    //Check correctness of patterns
    else if (!name_surnamePattern.test(name)) return res.status(400).send({message: "Name must start with a capital letter and be followed by small letters, max 10 letters"});
    else if (!name_surnamePattern.test(surname)) return res.status(400).send({message:"Surname must start with a capital letter and be followed by small letters, max 10 letters"});
    else if (!usernamePattern.test(username)) return res.status(400).send({message:"Username must be between 3 and 10 characters"});
    else if (!DNIPattern.test(DNI)) return res.status(400).send({message:"DNI contains 8 digits and a capital letter"});
    else if (!emailPattern.test(email)) return res.status(400).send({message:"Not a valid email address"});
    else if (!passwordPattern.test(password)) return res.status(400).send({message:"Password of min 6 characters, containing at least one lower and one uppercase letters, one digit and one special character"});
 
    //Check uniqueness of username, DNI and email in database
    db.query(
        "SELECT username, DNI, email FROM users WHERE username = ? OR DNI = ? OR email = ?",
        [username, DNI, email],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({message: "Database error", error: err});
            }

            if (result.length > 0) { //Check uniqueness of username, DNI and email
                let uniqueValue = [];
                result.forEach(user => {
                    if (user.DNI === DNI) uniqueValue.push("DNI"); 
                    if (user.username === username) uniqueValue.push("username"); 
                    if (user.email === email) uniqueValue.push("email"); 
                });
                return res.status(400).send({message: `The following fields are already taken: ${uniqueValue.join(", ")}`});
            }

            //Add user if username, DNI and email unique and patterns are correct
            db.query(
                "INSERT INTO users (name, surname, username, DNI, email, password, type) VALUES (?,?,?,?,?,?,?)", 
                [name, surname, username, DNI, email, password, type], 
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: "Registration failed", error: err});
                    } else {
                        console.log("User registered succesfully:", result.insertId);
                        res.status(200).send({message: "Registration successful", userId: result.insertId});
                        console.log("Redirecting to Dashboard");
                    }
                }
            ); 
        }
    );

});

// ------------------------------- LOGIN -------------------------------
//Login User
router.post("/login", (req, res) => {
    const {username, password} = req.body;
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password],  
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } 
            if (result.length > 0) { //Check if combination is in database
                console.log("User logged succesfully:", result);
                res.status(200).send({userId: result[0].user_id, username: result[0].username});

                console.log("Redirecting to Dashboard");
            } else {
                console.log("Wrong username or password");
                res.status(400).send({message: "Wrong username or password"})
            }
        }
    ); 
});



// ------------------------------- PERSONAL DATA -------------------------------
// ------------- USER DATA -------------
//Get User Data
router.get("/userUpdate/:id", (req, res) => {
    const userId = req.params.id;
    db.query("SELECT * FROM users WHERE user_id = ?", 
        [userId],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({message: "Error retrieving User data"});
            }
            console.log("User data retrieved succesfully:", result);
            res.status(200).send(result[0]);
        });
});

//Update User Data
router.put("/userUpdate/:id", (req, res) => {
    const userId = req.params.id;
    const {name, surname, username, DNI, email, password, type} = req.body;
   
    //Check no parameter is empty
    if (!name || !surname || !username || !DNI || !email || !password || !type) {
        return res.status(400).send({message: "All parameters are required"});
    }

    //Check correctness of patterns
    else if (!name_surnamePattern.test(name)) return res.status(400).send({message: "Name must start with a capital letter and be followed by small letters, max 10 letters"});
    else if (!name_surnamePattern.test(surname)) return res.status(400).send({message:"Surname must start with a capital letter and be followed by small letters, max 10 letters"});
    else if (!usernamePattern.test(username)) return res.status(400).send({message:"Username must be between 3 and 10 characters"});
    else if (!DNIPattern.test(DNI)) return res.status(400).send({message:"DNI contains 8 digits and a capital letter"});
    else if (!emailPattern.test(email)) return res.status(400).send({message:"Not a valid email address"});
    else if (!passwordPattern.test(password)) return res.status(400).send({message:"Password of min 6 characters, containing at least one lower and one uppercase letters, one digit and one special character"});
 
    //Check uniqueness of username, DNI and email in database
    db.query(
        "SELECT user_id, username, DNI, email FROM users WHERE (username = ? OR DNI = ? OR email = ?) AND user_id != ?",
        [username, DNI, email, userId],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({message: "Database error", error: err});
            }

            if (result.length > 0) { //Check uniqueness of username, DNI and email
                let uniqueValue = [];
                result.forEach(user => {
                    if (user.DNI === DNI) uniqueValue.push("DNI"); 
                    if (user.username === username) uniqueValue.push("username"); 
                    if (user.email === email) uniqueValue.push("email"); 
                });
                return res.status(400).send({message: `The following fields are already taken: ${uniqueValue.join(", ")}`});
            }
            
            //Add user if username, DNI and email unique and patterns are correct
            db.query("UPDATE users SET name = ?, surname = ?, username = ?, DNI = ?, email = ?, password = ?, type = ? WHERE user_id = ?",
                [name, surname, username, DNI, email, password, type, userId],
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: "Error updating User data"});
                    }
                    console.log("User data updated succesfully");
                    res.status(200).send({message: "User data updated successfully"});
                }
            );
        
        }
    );
});


// ------------- PROPERTY DATA -------------

// ------- ADDING A PROPERTY -------
//Add Property
router.post("/properties", (req, res) => {
    const {userId, propertyName, size, buildingAge, district, quantity, ages, income, remoteWorkers, workingSchedules, description, appliances, electricConsumption, gasConsumption, waterConsumption} = req.body;
    
    //Check no parameter is empty
    if (!propertyName || !size || !buildingAge || !district || !quantity || !ages || !income || !remoteWorkers || !workingSchedules || !electricConsumption || !gasConsumption || !waterConsumption ) {
        return res.status(400).send({message: "There are missing parameters"});
    }

    //Check correctness of patterns
    else if (!propertyName_Pattern.test(propertyName)) return res.status(400).send({message:"Property name must start with a capital letter and be followed by small letters, max 15 letters"});
    else if (!size_Pattern.test(size)) return res.status(400).send({message:"Size must not start by zero, cannot contain decimals and it must be up to 6 digits"});
    else if (!buildingAge_Pattern.test(buildingAge)) return res.status(400).send({message:"The age cannot contain decimals and it must be up to 4 digits"});
    else if (!district_Pattern.test(district)) return res.status(400).send({message:"District (Postal code) is 5 digits"});
    else if (!quantity_Pattern.test(quantity)) return res.status(400).send({message:"Quantity must not start by zero, cannot contain decimals and it must be up to 3 digits"});
    else if (!income_Pattern.test(income)) return res.status(400).send({message:"Income must not start by zero, cannot contain decimals and it must be up to 7 digits"});
    else if (!consumption_Pattern.test(electricConsumption)) return res.status(400).send({message:"Electrical Consumption must not start by zero, cannot contain decimals and it must be up to 5 digits"});
    else if (!consumption_Pattern.test(gasConsumption)) return res.status(400).send({message:"Gas Consumption must not start by zero, cannot contain decimals and it must be up to 5 digits"});
    else if (!consumption_Pattern.test(waterConsumption)) return res.status(400).send({message:"Water Consumption must not start by zero, cannot contain decimals and it must be up to 5 digits"});
    
    //Check uniqueness of property names of the user
    db.query(
        "SELECT * FROM property WHERE user_id = ? AND propertyName = ?",
        [userId, propertyName],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({message: "Database error", error: err});
            }

            if (result.length > 0) { //Check uniqueness
                return res.status(400).send({message: "There is already a property with this name"});
            }
            
            db.query(
                "INSERT INTO property (user_id, propertyName, size, buildingAge, district, quantity, ages, income, remoteWorkers, workingSchedules, description, appliances, electricConsumption, gasConsumption, waterConsumption) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [userId, propertyName, size, buildingAge, district, quantity, ages, income, remoteWorkers, workingSchedules, description, appliances, electricConsumption, gasConsumption, waterConsumption], 
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: "Registration of Property failed", error: err});
                    } else {
                        console.log("Property registered succesfully:", result.insertId);
                        res.status(200).send({message: "Registration of Property successful", propertyId: result.insertId});
                    }
                }
            );
        
        }
    );
});

//Get User Property (Adding)
router.get("/properties/:userId", (req, res) => {
    const userId = req.params.userId;
    db.query("SELECT * FROM property WHERE user_id = ?", 
        [userId], 
        (err, result) => {
        if (err) {
            console.error("Error fetching properties:", err);
            return res.status(500).send({ message: "Database error", error: err });
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "No properties found" });
        }
        res.status(200).send(result);
    });
});

//Delete User Property
router.delete("/properties/:id", (req, res) => {
    const propertyId = req.params.id;

    db.query("DELETE FROM property WHERE property_id = ?", 
        [propertyId], 
        (err) => {
        if (err) {
            return res.status(500).send({ message: "Error deleting property" });
        }
        res.status(200).send({ message: "Property deleted successfully" });
    });
});

// ------- EDITING A PROPERTY -------
//Get Property (Editing)
router.get("/propertiesUpdate/:id", (req, res) => {
    const propertyId = req.params.id;
    db.query("SELECT * FROM property WHERE property_id = ?", 
        [propertyId], 
        (err, result) => {
        if (err) {
            console.log("Error fetching property:", err);
            return res.status(500).send({message: "Error getting property"});
        }
        if (!result.length) {
            return res.status(404).send({message: "Property not found"});
        }
        res.status(200).send(result[0]);
    });
});

//Update User Property
router.put("/propertiesUpdate/:id", (req, res) => {
    const propertyId = req.params.id;
    const {userId, propertyName, size, buildingAge, district, quantity, ages, income, remoteWorkers, workingSchedules, description, appliances, electricConsumption, gasConsumption, waterConsumption} = req.body;
    
    //Check no parameter is empty
    if (!propertyName || !size || !buildingAge || !district || !quantity || !ages || !income || !remoteWorkers || !workingSchedules || !electricConsumption || !gasConsumption || !waterConsumption ) {
        return res.status(400).send({message: "There are missing parameters"});
    }

    //Check correctness of patterns
    else if (!propertyName_Pattern.test(propertyName)) return res.status(400).send({message:"Property name must start with a capital letter and be followed by small letters, max 15 letters"});
    else if (!size_Pattern.test(size)) return res.status(400).send({message:"Size must not start by zero, cannot contain decimals and it must be up to 6 digits"});
    else if (!buildingAge_Pattern.test(buildingAge)) return res.status(400).send({message:"The age cannot contain decimals and it must be up to 4 digits"});
    else if (!district_Pattern.test(district)) return res.status(400).send({message:"District (Postal code) is 5 digits"});
    else if (!quantity_Pattern.test(quantity)) return res.status(400).send({message:"Quantity must not start by zero, cannot contain decimals and it must be up to 3 digits"});
    else if (!income_Pattern.test(income)) return res.status(400).send({message:"Income must not start by zero, cannot contain decimals and it must be up to 7 digits"});
    else if (!consumption_Pattern.test(electricConsumption)) return res.status(400).send({message:"Electrical Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits"});
    else if (!consumption_Pattern.test(gasConsumption)) return res.status(400).send({message:"Gas Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits"});
    else if (!consumption_Pattern.test(waterConsumption)) return res.status(400).send({message:"Water Consumption must not start nor be zero, cannot contain decimals and it must be up to 5 digits"});
    
    //Check uniqueness of property names of the user
    db.query(
        "SELECT * FROM property WHERE user_id = ? AND propertyName = ? AND property_id != ?",
        [userId, propertyName, propertyId],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({message: "Database error", error: err});
            }

            if (result.length > 0) { //Check uniqueness
                return res.status(400).send({message: "There is already a property with this name"});
            }
            
            db.query("UPDATE property SET propertyName = ?, size = ?, buildingAge = ?, district = ?, quantity = ?, ages = ?, income = ?, remoteWorkers = ?, workingSchedules = ?, description = ?, appliances = ?, electricConsumption = ?, gasConsumption = ?, waterConsumption = ? WHERE property_id = ?",
                [propertyName, size, buildingAge, district, quantity, ages, income, remoteWorkers, workingSchedules, description, appliances, electricConsumption, gasConsumption, waterConsumption, propertyId], 
                (err) => {
                    if (err) {
                        return res.status(500).send({message: "Error updating property"});
                    }
                    res.status(200).send({message: "Property updated successfully"});
                });
        
        
        
        
        }
    );
});



const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

// Upload donation (Excel)
router.post('/donation/upload', upload.single('file'), (req, res) => {
  const { userId, propertyId, dataType } = req.body;
  const filePath = req.file.path;

  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const contract = `User agrees to donate ${data.length} records of ${dataType} data.`;
  const security = `Data is protected and anonymized.`;
  const content = JSON.stringify(data);

  db.query("INSERT INTO donations (user_id, property_id, data_type, contract, data, security) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, propertyId, dataType, contract, content, security],
    (err) => {
      fs.unlinkSync(filePath);
      if (err) return res.status(500).send("Failed to store donation");
      res.send({ message: "Donation uploaded" });
    });
});

// Get donation info
router.get("/donation/:userId/:propertyId/:dataType", (req, res) => {
  const { userId, propertyId, dataType } = req.params;

  db.query(
    "SELECT * FROM donations WHERE user_id = ? AND property_id = ? AND data_type = ?",
    [userId, propertyId, dataType],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (!result.length) return res.status(404).send();

      const donation = result[0];
      res.send({
        contract: donation.contract,
        data: donation.data,
        security: donation.security,
      });
    }
  );
});

// Get consents
router.get("/consents/:userId/:propertyId/:dataType", (req, res) => {
  const { userId, propertyId, dataType } = req.params;

  db.query("SELECT donation_id FROM donations WHERE user_id = ? AND property_id = ? AND data_type = ?",
    [userId, propertyId, dataType],
    (err, result) => {
      if (err || !result.length) return res.status(404).send([]);
      const donationId = result[0].donation_id;

      db.query("SELECT category FROM consents WHERE donation_id = ?", [donationId], (err2, rows) => {
        if (err2) return res.status(500).send([]);
        const consents = rows.map(r => r.category);
        res.send(consents);
      });
    });
});

// Update consents
router.post("/consents/:userId/:propertyId/:dataType", (req, res) => {
  const { userId, propertyId, dataType } = req.params;
  const { consents } = req.body;

  db.query("SELECT donation_id FROM donations WHERE user_id = ? AND property_id = ? AND data_type = ?",
    [userId, propertyId, dataType],
    (err, result) => {
      if (err || !result.length) return res.status(404).send();
      const donationId = result[0].donation_id;

      db.query("DELETE FROM consents WHERE donation_id = ?", [donationId], () => {
        if (!consents.length) return res.send({ message: "Consents cleared" });

        const values = consents.map(c => [donationId, c]);
        db.query("INSERT INTO consents (donation_id, category) VALUES ?", [values], (err2) => {
          if (err2) return res.status(500).send(err2);
          res.send({ message: "Consents updated" });
        });
      });
    });
});

// Delete donation + consents
router.delete("/donation/:userId/:propertyId/:dataType", (req, res) => {
  const { userId, propertyId, dataType } = req.params;

  db.query("SELECT donation_id FROM donations WHERE user_id = ? AND property_id = ? AND data_type = ?",
    [userId, propertyId, dataType],
    (err, result) => {
      if (err || !result.length) return res.status(404).send();
      const donationId = result[0].donation_id;

      db.query("DELETE FROM consents WHERE donation_id = ?", [donationId], () => {
        db.query("DELETE FROM donations WHERE donation_id = ?", [donationId], () => {
          res.send({ message: "Donation and consents deleted" });
        });
      });
    });
});

module.exports = router;
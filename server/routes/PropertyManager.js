const express = require('express');
const router = express.Router();
const db = require('../db');

const propertyName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,14}$/;
const size_Pattern = /^[1-9][0-9]{0,5}$/;
const buildingAge_Pattern = /^[0-9]{0,4}$/;
const district_Pattern = /^[0-9]{5}$/;
const quantity_Pattern = /^[1-9][0-9]{0,2}$/;
const income_Pattern = /^[1-9][0-9]{0,6}$/;
const consumption_Pattern = /^[1-9][0-9]{0,4}$/;

// ------------------------------- PERSONAL DATA -------------------------------

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

//Get User Properties (Adding)
router.get("/properties/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query("SELECT * FROM property WHERE user_id = ?", 
        [userId], 
        (err, result) => {
        if (err) {
            console.error("Error getting properties:", err);
            return res.status(500).send({message: "Database error", error: err});
        }
        if (result.length === 0) {
            return res.status(404).send({message: "No properties found"});
        }
        res.status(200).send(result);
    });
});

//Delete Property
router.delete("/properties/:id", (req, res) => {
    const propertyId = req.params.id;

    db.query("DELETE FROM property WHERE property_id = ?", 
        [propertyId], 
        (err) => {
        if (err) {
            return res.status(500).send({message: "Error deleting property"});
        }
        res.status(200).send({message: "Property deleted successfully"});
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
            console.log("Error getting property:", err);
            return res.status(500).send({message: "Error getting property"});
        }
        if (!result.length) {
            return res.status(404).send({message: "Property not found"});
        }
        res.status(200).send(result[0]);
    });
});

//Update Property
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

  
module.exports = router;
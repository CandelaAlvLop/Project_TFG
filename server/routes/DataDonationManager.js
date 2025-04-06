const express = require('express');
const router = express.Router();
const db = require('../db');

// ------------------------------- DATA DONATION -------------------------------
router.get("/properties/:userId", (req, res) => {
    const userId = req.params.userId;
    
    db.query("SELECT property_id, propertyName FROM property WHERE user_id = ?", 
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
  
//Upload data file
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, 'uploads/');},
    filename: (req, file, cb) => {
        const consumeType = req.params.consumeType;
        const fileName = `${consumeType}(${Date.now()})_${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({storage});

//Insert data file into Database
router.post('/donation/:userId/:propertyId/:consumeType', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({message: "No file uploaded"});
    }

    const {userId, propertyId, consumeType} = req.params;
    const filename = req.file.filename;
    const filepath = req.file.path;

    db.query(
        "INSERT INTO donations_metadata (user_id, property_id, consume_type, filename) VALUES (?, ?, ?, ?)",
        [userId, propertyId, consumeType, filename],
        (err, result) => {
            if (err) {
                console.error("Error inserting file information to the database:", err);
                return res.status(500).send({message: "Error inserting file information to the database"}); 
            }   
            /*console.log("File uploaded and saved the file", filename);
            res.status(200).send({message: "File uploaded and saved the file", filename});
            }
            );*/

            const donationId = result.insertId;
            const readings = [];

            fs.createReadStream(filepath)
                .pipe(csv({separator: ',', headers: ['TimerHours','TimerDay','TimerMonth','TimerYear','WaterMeterReading','ElectricityMeterReading','GasMeterReading']}))
                .on('data', (row) => {
                    let columnName = "";
                    if (consumeType === 'Water') columnName = 'WaterMeterReading';
                    else if (consumeType === 'Electric') columnName = 'ElectricityMeterReading';
                    else if (consumeType === 'Gas') columnName = 'GasMeterReading';

                    const reading = parseFloat(row[columnName]); ////////////

                    if (!isNaN(reading)) { /////////////
                        readings.push([donationId, parseInt(row.TimerHours), parseInt(row.TimerDay), parseInt(row.TimerMonth), parseInt(row.TimerYear), reading]);
                    }
                })
                .on('end', () => {
                    if (readings.length === 0) {
                        return res.status(200).send({message: "File metadata is saved but readings are not stored", filename});
                      }
                    db.query(
                        "INSERT INTO donations_readings (donation_id, timer_hours, timer_day, timer_month, timer_year, meter_reading) VALUES ?",
                        [readings],
                        (err) => {
                            if (err) {
                                console.error("Error inserting data readings to the database:", err);
                                return res.status(500).send({message: "Error inserting data readings to the database:"});
                            }
                            console.log(`File ${filename} uploaded and saved, whith ${readings.length} readings inserted`);
                            res.status(200).send({message: "File uploaded and saved:", filename});
                        }
                    );
                });
        }
    );
});
 
//Get data file
router.get("/donations/:userId/:propertyId/:consumeType", (req, res) => {
    const { userId, propertyId, consumeType } = req.params;
    
    db.query(
        "SELECT * FROM donations_metadata WHERE user_id = ? AND property_id = ? AND consume_type = ?",
        [userId, propertyId, consumeType],
        (err, result) => {
            if (err) {
                console.error("Error getting donations:", err);
                return res.status(500).send({message: "Database error", error: err});
            }
            if (result.length === 0) {
                return res.status(404).send({message: "No donations found"});
            }
            res.status(200).send(result);
        }
    );
});

module.exports = router;
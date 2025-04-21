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
        const fileName = `${consumeType}_${file.originalname}`;
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
    const readings = [];
    let format = true;

    fs.createReadStream(filepath) //Read line by line
        //FILE FORMAT
        .pipe(csv({separator: ',', headers: ['TimerHours','TimerDay','TimerMonth','TimerYear','WaterMeterReading','ElectricityMeterReading','GasMeterReading']})) //Map to headers
        .on('data', (row) => { //For each row check column type
            let headerType = "";
            if (consumeType === 'Water') headerType = 'WaterMeterReading';
            else if (consumeType === 'Electric') headerType = 'ElectricityMeterReading';
            else if (consumeType === 'Gas') headerType = 'GasMeterReading';

            if (isNaN(row.TimerHours) || isNaN(row.TimerDay) || isNaN(row.TimerMonth) || isNaN(row.TimerYear) || isNaN(row[headerType])) {
                format = false;
                return;
            }

            //Parse reading (string) for each row into a int/float and push into readings
            readings.push([parseInt(row.TimerHours), parseInt(row.TimerDay), parseInt(row.TimerMonth), parseInt(row.TimerYear), parseFloat(row[headerType])]); 
        })
        .on('end', () => { //After all file is read
            if (readings.length === 0 || !format) return res.status(400).send({message: `The uploaded file must include the following columns: 
                • TimerHours 
                • TimerDay 
                • TimerMonth 
                • TimerYear 
                • WaterMeterReading
                • ElectricityMeterReading
                • GasMeterReading`});
                        
            db.query(
                "INSERT INTO donations_metadata (user_id, property_id, consume_type, filename) VALUES (?, ?, ?, ?)",
                [userId, propertyId, consumeType, filename],
                (err, result) => {
                    if (err) {
                        console.error("Error inserting file information to the database:", err);
                        return res.status(500).send({message: "Error inserting file information to the database"}); 
                    }   

                    const donationId = result.insertId;
                    const finalReadings = readings.map(read => [donationId, ...read]); //Insert donationId

                    db.query(
                        "INSERT INTO donations_readings (donation_id, timer_hours, timer_day, timer_month, timer_year, meter_reading) VALUES ?",
                        [finalReadings],
                        (err) => {
                            if (err) {
                                console.error("Error inserting data read into to the database:", err);
                                return res.status(500).send({message: "Error inserting data read into the database"});
                            }
                            console.log(`File ${filename} uploaded and saved, whith ${finalReadings.length} readings inserted`);
                            res.status(200).send({message: "File uploaded and saved:", filename});
                        }
                    );
                }
            );
        })
});
 
//Get data file
router.get("/donations/:userId/:propertyId/:consumeType", (req, res) => {
    const { userId, propertyId, consumeType } = req.params;
    
    db.query(
        "SELECT * FROM donations_metadata WHERE user_id = ? AND property_id = ? AND consume_type = ? ORDER BY upload_time ASC",
        [userId, propertyId, consumeType],
        (err, result) => {
            if (err) {
                console.error("Error getting donations:", err);
                return res.status(500).send({message: "Database error", error: err});
            }
            if (result.length === 0) {
                return res.status(404).send({message: "No donations found"});
            }
            const firstUpload = result[0];
            const lastUpload = result[result.length - 1];
            res.status(200).send({files: result, firstUpload, lastUpload});
        }
    );
});

module.exports = router;
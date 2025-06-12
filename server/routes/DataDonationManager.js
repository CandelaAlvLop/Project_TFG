const express = require("express");
const router = express.Router();
const db = require("../db");


// ------------------------------- DATA DONATION -------------------------------
//Get User Properties
router.get("/properties/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query("SELECT property_id, propertyName FROM property WHERE user_id = ?",
        [userId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting property data" });
            }
            res.status(200).send(result);
        });
});

//Upload Data File
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "uploads"); },
    filename: (req, file, cb) => {
        const { consumeType, propertyId } = req.params;
        const fileName = `${consumeType}${propertyId}_${file.originalname}`;
        cb(null, fileName);
    }
});

const multer_storage = multer({ storage });

router.post("/donation/:userId/:propertyId/:consumeType", multer_storage.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
    }

    const { userId, propertyId, consumeType } = req.params;
    const filename = req.file.filename;
    const filepath = req.file.path;
    const readings = [];
    let format = true;

    fs.createReadStream(filepath) //Read line by line
        //FILE FORMAT
        .pipe(csv({ separator: ",", headers: ["TimerHours", "TimerDay", "TimerMonth", "TimerYear", "WaterMeterReading", "ElectricityMeterReading", "GasMeterReading"] })) //Map to headers
        .on("data", (row) => { //For each row check column type
            let headerType = "";
            if (consumeType === "Water") headerType = "WaterMeterReading";
            else if (consumeType === "Electric") headerType = "ElectricityMeterReading";
            else if (consumeType === "Gas") headerType = "GasMeterReading";

            if (isNaN(row.TimerHours) || isNaN(row.TimerDay) || isNaN(row.TimerMonth) || isNaN(row.TimerYear) || isNaN(row[headerType])) {
                format = false;
                return;
            }

            //Parse reading (string) for each row into a int/float and push into readings
            readings.push([parseInt(row.TimerHours), parseInt(row.TimerDay), parseInt(row.TimerMonth), parseInt(row.TimerYear), parseFloat(row[headerType])]);
        })
        .on("end", () => { //After all file is read
            if (readings.length === 0 || !format) { //If file is not valid remove it
                fs.unlinkSync(filepath);
                return res.status(400).send({
                    message: `The uploaded file must include the following columns: 
                        • TimerHours 
                        • TimerDay 
                        • TimerMonth 
                        • TimerYear 
                        • WaterMeterReading
                        • ElectricityMeterReading
                        • GasMeterReading`});
            }
            //If valid store it in uploads folder, but check it does not already exist
            db.query(
                "SELECT * FROM donations_metadata WHERE user_id = ? AND property_id = ? AND consume_type = ? AND filename = ?",
                [userId, propertyId, consumeType, filename],
                (err, result) => {
                    if (err) {
                        res.status(500).send({ message: "Error checking if file already exists" });
                    }
                    if (result.length > 0) { //If file already uploaded do not proceed
                        return res.status(400).send({ message: "This file has already been uploaded for this consume type and property. Try again." });
                    }

                    db.query(
                        "INSERT INTO donations_metadata (user_id, property_id, consume_type, filename) VALUES (?, ?, ?, ?)",
                        [userId, propertyId, consumeType, filename],
                        (err, result) => {
                            if (err) {
                                return res.status(500).send({ message: "Error inserting file information to the database" });
                            }

                            const donationId = result.insertId;
                            const finalReadings = readings.map(read => [donationId, ...read]); //Insert donationId

                            db.query(
                                "INSERT INTO donations_readings (donation_id, timer_hours, timer_day, timer_month, timer_year, meter_reading) VALUES ?",
                                [finalReadings],
                                (err) => {
                                    if (err) {
                                        return res.status(500).send({ message: "Error inserting data read into the database" });
                                    }
                                    res.status(200).send({ message: "File uploaded and saved:", filename, donationId });
                                });
                        });
                })
        })
});

//Get donations
router.get("/donations/:userId/:propertyId/:consumeType", (req, res) => {
    const { userId, propertyId, consumeType } = req.params;

    db.query(
        "SELECT * FROM donations_metadata WHERE user_id = ? AND property_id = ? AND consume_type = ? ORDER BY upload_time ASC",
        [userId, propertyId, consumeType],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting donations" });
            }
            const firstUpload = result[0];
            const lastUpload = result[result.length - 1];
            res.status(200).send({ files: result, firstUpload, lastUpload });
        }
    );
});

//Save Consents
router.post("/consent", (req, res) => {
    const { donationId, consents } = req.body;

    db.query(
        "SELECT * FROM donations_consent WHERE donation_id = ?",
        [donationId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error checking existing consents" });
            }
            if (result.length > 0) {
                db.query(
                    "UPDATE donations_consent SET consents = ? WHERE donation_id = ?",
                    [consents, donationId],
                    (update_err) => {
                        if (update_err) {
                            return res.status(500).send({ message: "Error updating consents" });
                        }
                        return res.status(200).send({ message: "Consents updated successfully" });
                    }
                );
            } else {
                db.query(
                    "INSERT INTO donations_consent (donation_id, consents) VALUES (?, ?)",
                    [donationId, consents],
                    (insert_err) => {
                        if (insert_err) {
                            return res.status(500).send({ message: "Error inserting consents" });
                        }
                        return res.status(200).send({ message: "Consents inserted successfully" });
                    }
                );
            }
        }
    );
});

//Get Consents
router.get("/consent/:donationId", (req, res) => {
    const { donationId } = req.params;

    db.query(
        "SELECT consents FROM donations_consent WHERE donation_id = ?",
        [donationId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting consents" });
            }
            if (result.length !== 0) {
                res.status(200).send({ consents: result[0].consents.split(",") });
            }
        }
    );
});

//Delete Donation
router.post("/donationDelete", (req, res) => {
    const { userId, donationId, justifications } = req.body;

    //Save Justifications
    db.query("INSERT INTO donations_justification (user_id, justification) VALUES (?,?)",
        [userId, justifications],
        (insert_err) => {
            if (insert_err) {
                return res.status(500).send({ message: "Error inserting justifications" });
            }

            //Delete data from Database Tables
            db.query("DELETE FROM donations_readings WHERE donation_id = ?",
                [donationId],
                (err) => {
                    if (err) {
                        return res.status(500).send({ message: "Error deleting donation readings" });
                    }

                    db.query("DELETE FROM donations_consent WHERE donation_id = ?",
                        [donationId],
                        (err) => {
                            if (err) {
                                return res.status(500).send({ message: "Error deleting donation consent" });
                            }

                            //Delete file from uploads folder
                            db.query("SELECT filename FROM donations_metadata WHERE donation_id = ?",
                                [donationId],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).send({ message: "Error getting filename from metadata" });
                                    }

                                    const filepath = `uploads/${result[0].filename}`;
                                    fs.unlink(filepath, (err) => {
                                        if (err) {
                                            res.status(500).send({ message: "Error deleting file" });
                                        }

                                        //Delete metadata from Database Tables
                                        db.query("DELETE FROM donations_metadata WHERE donation_id = ?",
                                            [donationId],
                                            (err) => {
                                                if (err) {
                                                    return res.status(500).send({ message: "Error deleting donation metadata" });
                                                }
                                                res.status(200).send({ message: `Donation ${donationId} deleted successfully` });
                                            });
                                    })
                                });
                        });
                });
        });
});

//Get Consume
router.get("/consume/:propertyId/:consumeType", (req, res) => {
    const { propertyId, consumeType } = req.params;

    db.query(
        `SELECT R.timer_hours,R.timer_day,R.timer_month,R.timer_year,R.meter_reading FROM donations_readings R JOIN donations_metadata M ON R.donation_id = M.donation_id WHERE M.property_id = ? AND M.consume_type = ? ORDER BY R.timer_year, R.timer_month, R.timer_day, R.timer_hours`,
        [propertyId, consumeType],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting readings" });
            }
            res.status(200).send(result);
        }
    );
});

module.exports = router;
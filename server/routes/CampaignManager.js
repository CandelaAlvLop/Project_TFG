const express = require('express');
const router = express.Router();
const db = require('../db');

// ------------------------------- USER CAMPAIGNS -------------------------------

const campaignName_Pattern = /^[A-Z][a-zA-Z0-9\s]{0,14}$/;

// ------- ADDING A CAMPAIGN -------
//Add Campaign
router.post("/campaigns", (req, res) => {
    const { userId, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, titleObjective3, description3, titleObjective4, 
        description4, step1, step2, step3, whyJoin,  moreInfo, conclusionSentence } = req.body;

    //Check no parameter is empty
    if (!campaignName || !description || !dates| !endDate| !retainDate| !type || !titleObjective1 || !descriptionObjective1 || !titleObjective2 || !descriptionObjective2 || !titleObjective3 || !description3 || !titleObjective4 
         || !description4 || !step1 || !step2 || !step3 || !whyJoin || !moreInfo || !conclusionSentence) {
        return res.status(400).send({ message: "There are missing parameters" });
    }

    //Check correctness of patterns
    else if (!campaignName_Pattern.test(campaignName)) return res.status(400).send({ message: "Campaign name must start with a capital letter and be followed by small letters, max 15 letters" });

    //Check uniqueness of campaign names of the user
    db.query(
        "SELECT * FROM campaign WHERE user_id = ? AND campaignName = ?",
        [userId, campaignName],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({ message: "Database error", error: err });
            }

            if (result.length > 0) { //Check uniqueness
                return res.status(400).send({ message: "There is already a campaign with this name" });
            }

            db.query(
                `INSERT INTO campaign (user_id, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, 
                titleObjective3, description3, titleObjective4, description4, step1, step2, step3, whyJoin,  moreInfo, conclusionSentence) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [userId, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, titleObjective3, description3, titleObjective4, 
                    description4, step1, step2, step3, whyJoin,  moreInfo, conclusionSentence],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({ message: "Registration of Campaign failed", error: err });
                    } else {
                        console.log("Campaign registered succesfully:", result.insertId);
                        res.status(200).send({ message: "Registration of Campaign successful", campaignId: result.insertId });
                    }
                }
            );

        }
    );
});


//Get User Campaigns (Adding)
router.get("/campaigns/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query("SELECT * FROM campaign WHERE user_id = ?",
        [userId],
        (err, result) => {
            if (err) {
                console.error("Error getting campaigns:", err);
                return res.status(500).send({ message: "Database error", error: err });
            }
            if (result.length === 0) {
                return res.status(404).send({ message: "No campaigns found" });
            }
            res.status(200).send(result);
        });
});

//Delete Campaign
router.delete("/campaigns/:id", (req, res) => {
    const campaignId = req.params.id;

    db.query("DELETE FROM campaign WHERE campaign_id = ?",
        [campaignId],
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error deleting campaign" });
            }
            res.status(200).send({ message: "Campaign deleted successfully" });
        });
});

// ------- EDITING A CAMPAIGN -------
//Get Campaign (Editing)
router.get("/campaignsUpdate/:id", (req, res) => {
    const campaignId = req.params.id;
    db.query("SELECT * FROM campaign WHERE campaign_id = ?",
        [campaignId],
        (err, result) => {
            if (err) {
                console.log("Error getting campaign:", err);
                return res.status(500).send({ message: "Error getting campaign" });
            }
            if (!result.length) {
                return res.status(404).send({ message: "Campaign not found" });
            }
            res.status(200).send(result[0]);
        });
});

//Update Campaign
router.put("/campaignsUpdate/:id", (req, res) => {
    const campaignId = req.params.id;
    const { userId, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, titleObjective3, description3, titleObjective4, 
        description4, step1, step2, step3, whyJoin,  moreInfo, conclusionSentence } = req.body;

    //Check no parameter is empty
    if (!campaignName || !description || !dates| !endDate| !retainDate| !type || !titleObjective1 || !descriptionObjective1 || !titleObjective2 || !descriptionObjective2 || !titleObjective3 || !description3 || !titleObjective4 
         || !description4 || !step1 || !step2 || !step3 || !whyJoin || !moreInfo || !conclusionSentence) {
        return res.status(400).send({ message: "There are missing parameters" });
    }

    //Check correctness of patterns
    else if (!campaignName_Pattern.test(campaignName)) return res.status(400).send({ message: "Campaign name must start with a capital letter and be followed by small letters, max 15 letters" });

    //Check uniqueness of campaign names of the user
    db.query(
        "SELECT * FROM campaign WHERE user_id = ? AND campaignName = ? AND campaign_id != ?",
        [userId, campaignName, campaignId],
        (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).send({ message: "Database error", error: err });
            }

            if (result.length > 0) { //Check uniqueness
                return res.status(400).send({ message: "There is already a campaign with this name" });
            }

            db.query(`UPDATE campaign SET campaignName = ?, description = ?, dates = ?, endDate = ?, retainDate = ?, type = ?, titleObjective1 = ?, descriptionObjective1 = ?, titleObjective2 = ?, descriptionObjective2 = ?, 
                titleObjective3 = ?, description3 = ?, titleObjective4 = ?, description4 = ?, step1 = ?, step2 = ?, step3 = ?, whyJoin = ?,  moreInfo = ?, conclusionSentence = ? WHERE campaign_id = ?`,
                [campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, 
                titleObjective3, description3, titleObjective4, description4, step1, step2, step3, whyJoin,  moreInfo, conclusionSentence, campaignId],
                (err) => {
                    if (err) {
                        return res.status(500).send({ message: "Error updating campaign" });
                    }
                    res.status(200).send({ message: "Campaign updated successfully" });
                });
        }
    );
});

module.exports = router;
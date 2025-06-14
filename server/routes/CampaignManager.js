const express = require("express");
const router = express.Router();
const db = require("../db");


// ------- ADDING A CAMPAIGN -------
//Add Campaign
router.post("/campaigns", (req, res) => {
    const { userId, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, titleObjective3, descriptionObjective3, titleObjective4,
        descriptionObjective4, step1, step2, step3, whyJoin, moreInfo, conclusionSentence } = req.body;

    //Check no parameter is empty
    if (!campaignName || !description || !dates | !endDate | !retainDate | !type || !titleObjective1 || !descriptionObjective1 || !titleObjective2 || !descriptionObjective2 || !titleObjective3 || !descriptionObjective3 || !titleObjective4
        || !descriptionObjective4 || !step1 || !step2 || !step3 || !whyJoin || !moreInfo || !conclusionSentence) {
        return res.status(400).send({ message: "There are missing parameters" });
    }

    //Check uniqueness of campaign names of the user
    db.query(
        "SELECT * FROM campaign WHERE user_id = ? AND campaignName = ?",
        [userId, campaignName],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting campaign data" });
            }

            if (result.length > 0) {
                return res.status(400).send({ message: "There is already a campaign with this name" });
            }

            db.query(
                `INSERT INTO campaign (user_id, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, 
                titleObjective3, descriptionObjective3, titleObjective4, descriptionObjective4, step1, step2, step3, whyJoin,  moreInfo, conclusionSentence) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [userId, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, titleObjective3, descriptionObjective3, titleObjective4,
                    descriptionObjective4, step1, step2, step3, whyJoin, moreInfo, conclusionSentence],
                (err, result) => {
                    if (err) {
                        return res.status(500).send({ message: "Registration of Campaign failed" });
                    } else {
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
                return res.status(500).send({ message: "Error getting campaign data" });
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
                return res.status(500).send({ message: "Error getting campaign" });
            }
            res.status(200).send(result[0]);
        });
});

//Update Campaign
router.put("/campaignsUpdate/:id", (req, res) => {
    const campaignId = req.params.id;
    const { userId, campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2, titleObjective3, descriptionObjective3, titleObjective4,
        descriptionObjective4, step1, step2, step3, whyJoin, moreInfo, conclusionSentence } = req.body;

    //Check no parameter is empty
    if (!campaignName || !description || !dates || !endDate || !retainDate || !type || !titleObjective1 || !descriptionObjective1 || !titleObjective2 || !descriptionObjective2 || !titleObjective3 || !descriptionObjective3 || !titleObjective4
        || !descriptionObjective4 || !step1 || !step2 || !step3 || !whyJoin || !moreInfo || !conclusionSentence) {
        return res.status(400).send({ message: "There are missing parameters" });
    }

    //Check uniqueness of campaign names of the user
    db.query(
        "SELECT * FROM campaign WHERE user_id = ? AND campaignName = ? AND campaign_id != ?",
        [userId, campaignName, campaignId],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Error getting campaign data" });
            }

            if (result.length > 0) {
                return res.status(400).send({ message: "There is already a campaign with this name" });
            }

            db.query(`UPDATE campaign SET campaignName = ?, description = ?, dates = ?, endDate = ?, retainDate = ?, type = ?, titleObjective1 = ?, descriptionObjective1 = ?, titleObjective2 = ?, descriptionObjective2 = ?, 
                titleObjective3 = ?, descriptionObjective3 = ?, titleObjective4 = ?, descriptionObjective4 = ?, step1 = ?, step2 = ?, step3 = ?, whyJoin = ?,  moreInfo = ?, conclusionSentence = ? WHERE campaign_id = ?`,
                [campaignName, description, dates, endDate, retainDate, type, titleObjective1, descriptionObjective1, titleObjective2, descriptionObjective2,
                    titleObjective3, descriptionObjective3, titleObjective4, descriptionObjective4, step1, step2, step3, whyJoin, moreInfo, conclusionSentence, campaignId],
                (err) => {
                    if (err) {
                        return res.status(500).send({ message: "Error updating campaign" });
                    }
                    res.status(200).send({ message: "Campaign updated successfully" });
                });
        }
    );
});

//Get All Campaigns
router.get("/campaignsAll", (req, res) => {
    db.query("SELECT * FROM campaign",
        (err, result) => {
            if (err) {
                console.error("Error getting campaigns:", err);
                return res.status(500).send({ message: "Error getting campaign data" });
            }
            res.status(200).send(result);
        });
});

module.exports = router;
const express = require("express") //Instance of the express framework
const app = express() //Allows to make API requests, initialize our server, etc
const cors = require("cors"); //Allow cross platform, sending information from backend to frontend

app.use(express.json());
app.use(cors());

//Routes to Managers
const userRoute = require("./routes/UserManager");
app.use("/UserManager", userRoute);

const propertyRoute = require("./routes/PropertyManager");
app.use("/PropertyManager", propertyRoute);

const dataRoute = require("./routes/DataDonationManager");
app.use("/DataDonationManager", dataRoute);

const campaignRoute = require("./routes/CampaignManager");
app.use("/CampaignManager", campaignRoute);


//Start API, with any port different to the react application
app.listen(3001, () => {
    console.log("Server running on port 3001")
}); 
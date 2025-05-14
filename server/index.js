const express = require('express') //instance of the express framework
const app = express() //this allows to make API requests, initialize our server, etc
const cors = require("cors"); //Allow cross platform, sending information from backend to frontend

app.use(express.json());
app.use(cors());

//Router
const userRoute = require("./routes/UserManager");
app.use("/UserManager", userRoute);

const propertyRoute = require("./routes/PropertyManager");
app.use("/PropertyManager", propertyRoute);

const dataRoute = require("./routes/DataDonationManager");
app.use("/DataDonationManager", dataRoute);

const campaignRoute = require("./routes/CampaignManager");
app.use("/CampaignManager", campaignRoute);


//Start API, you can use any port but it must be different than our react application
app.listen(3001, () => {
    //Pass anonymous function that is going to run whenever the server starts, to get a confirmation that the server is running
    console.log("Server running on port 3001")
}); 
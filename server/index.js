const express = require('express') //instance of the express framework
const app = express() //this allows to make API requests, initialize our server, etc


//Router
const userRoute = require("./routes/Users");
app.use("/users", userRoute);


//Start API, you can use any port but it must be different than our react application
app.listen(3001, () => {
    //Pass anonymous function that is going to run whenever the server starts, to get a confirmation that the server is running
    console.log("Server running on port 3001")
}); 
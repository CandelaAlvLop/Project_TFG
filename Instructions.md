# Project_TFG

### Step 1: Clone the Project Repository
First, clone the current project GitHub repository into your machine. It contains the client, server and database structure, along with this same set of instructions.

### Step 2: Install Dependencies
Once the project is stored on your machine, you must open two terminals inside "Project_TFG”  for the server (**cd server**) and client (**cd client**) and run **npm install** to install the dependencies and create the node_modules directories.

### Step 3: Configure Connection to Database
The platform uses a MySQL database named “database_tfg”. The current setup contains default credentials provided in **db.js**. If you desire to use your own credentials, access the file db.js in the server directory and modify the pre-set user and password to match your database.
 
### tep 4: Deploy the Platform
Next, to launch the web interface, two terminals must be open inside the project:
- **Server**: Inside "Project_TFG" access folder "server" (cd server) and execute the command npm start. This will deploy the server and its connection to the database.
- **Client**: Inside "Project_TFG" access folder "client" (cd client) and execute the command npm start. This will open the web in your navigator.

If a permission error occurs when starting the server due to the difference between macOS/Linux and Windows operating systems, execute in the server **chmod +x node_modules/.bin/nodemon**.

### Step 5: Access the Platform
Finally, once you have the interface open on your web browser, you can either register yourself as a new user, that could either be a donor or a secondary user, or you can log in with one of the multiple predefined credentials:
- To access as a Donor, you can use the username **vladimir** or **cande** with the password **123Abc***.
- To access as a Secondary User, you can use the username **pol**, **carla**, **claudia** or **marta** with the password **123Abc***.

These instructions apply to the deployment of the currently local project. The next step will be to launch it through the DATALOG virtual machine, enabling remote access.

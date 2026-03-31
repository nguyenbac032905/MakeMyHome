const express = require("express");
require("dotenv").config();
const database = require("./config/database");

database.connect();

const app = express();

const port = process.env.PORT||3000;

app.use(express.json());

const routeClient = require("./routes/client/index.route");
routeClient(app);
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);


app.listen(port,() => {
    console.log(`App listen on port ${port}`);
})


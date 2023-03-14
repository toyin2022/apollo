const express = require("express");
const app = express();
const port = 3000;
const userRoute = require("./route/userRoute");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");

app.use(express.json());
app.use("/api/users", userRoute);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

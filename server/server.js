const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

const groupsRoutes = require("./routes/groupsRoutes");

app.use("/api/v1/groups", groupsRoutes);

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})
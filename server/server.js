const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

const groupsRoutes = require("./routes/groupsRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
let UserRoutes=require("./routerr");
app.use("/api/v1/groups", groupsRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/users", UserRoutes);

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})

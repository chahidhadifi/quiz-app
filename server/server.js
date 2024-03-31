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
const usersRoutes = require("./routes/usersRoutes");

app.use("/api/v1/groups", groupsRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/users", usersRoutes);

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})

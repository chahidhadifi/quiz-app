const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

const groupsRoutes = require("./routes/groupsRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const usersRoutes = require("./routes/usersRoutes");
const routerMail = require("./routes/mailRoutes");

app.use("/api/v1/groups", groupsRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/users", usersRoutes);

app.use('/api/v1/mail', routerMail)

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})

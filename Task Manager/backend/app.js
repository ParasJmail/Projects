const express = require("express");
const app = express();

const errorMiddleWare = require("./middleware/error")

app.use(express.json());

//Routes Imports
const task = require("./routes/taskRoute");

app.use("/api/v2",task);


//MiddleWare For Error
app.use(errorMiddleWare);

module.exports = app;
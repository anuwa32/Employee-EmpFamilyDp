require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const employeeRouter = require("./routes/employee");
const empFamilyRouter = require("./routes/empfamily");
const empIdRouter = require("./routes/empid");
const empFamIdRouter = require ("./routes/empfamilyid");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/employee", employeeRouter);
app.use("/api/empfamily", empFamilyRouter);
app.use("/api/empid", empIdRouter);
app.use("/api/empfamilyid", empFamIdRouter);

const port = process.env.PORT || 8086;
app.listen(port, console.log(`Listening on port ${port}...`));
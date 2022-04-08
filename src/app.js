const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/mongo");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const authRoute = require("./routes/authRoute");
const customerRoutes = require("./routes/customerRoutes");

dotenv.config();

const app = express();

//connect to DB
dbConnect();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully ");
});

//routes

app.use("/auth", authRoute);
app.use("/customers", customerRoutes);

//for Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;

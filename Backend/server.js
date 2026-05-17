require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require("./Routes/mainRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL ,
  credentials: true
}));
app.use(
  cookieParser({
    origin: process.env.CLIENT_URL ,
    credentials: true,
  }),
);
app.use("/api", allRoutes);

//  MongoDB connect function
const connectDB = require("./config/Mongodb");

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectDB();
});

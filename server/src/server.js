require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const server = require("http").createServer(app);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) console.log("DB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

// set port
const PORT = process.env.PORT || 3003;
server.listen(PORT, console.log(`Server run on ${PORT}`));

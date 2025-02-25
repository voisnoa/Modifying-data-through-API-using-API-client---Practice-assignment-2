const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const { resolve } = require('path');

dotenv.config();
const app = express();
const port = 3010;

app.use(express.static('static'));


mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const menuRoutes = require("./routes/menu");
app.use(express.json()); 
app.use("/menu", menuRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

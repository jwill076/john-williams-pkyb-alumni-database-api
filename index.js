const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const profilesRoute = require("./routes/profiles");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/profiles", profilesRoute);

app.all('*', (req,res)=> {
  res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(PORT, (error) => {
  error ? console.error(error) : console.log(`I'm currently running on http://localhost:${PORT}`);
});
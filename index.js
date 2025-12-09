const express = require("express");

const app = express();

app.use(express.json()); // parse JSON bodies

app.use((req, res, next) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running"));

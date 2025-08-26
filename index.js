// Import the express
const express = require("express");
// Creating express app
const app = express();
// Define a port
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/index.js"));


// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Import the express
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// Creating express app
const app = express();
// Define a port
const PORT = 8000;

app.use(express.static("./assets"));
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", require("./routes/index.js"));


// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
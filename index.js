require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose.js");
const cookieParser = require("cookie-parser");

// Creating express app
const app = express();
// Define a port
const PORT = process.env.PORT;

app.use(express.urlencoded());
app.use(cookieParser());
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
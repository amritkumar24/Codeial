// Import the express
const express = require("express");
// Creating express app
const app = express();
// Define a port
const PORT = 8000;
// Now we have to define a route
app.get("/", (req, res) => {
    res.send("Hello, Express Server is running");
});
// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
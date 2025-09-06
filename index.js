require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy.js");
const MongoStore = require("connect-mongo");
const path = require("path");
const flash = require("connect-flash");
const customMware = require("./config/middleware.js");

const app = express();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);

app.use(session({
    name: "codeial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        client: db.getClient()
    }),
    cookie: {
        maxAge: (1000*60*100),
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", require("./routes/index.js"));


// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
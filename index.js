require("dotenv").config();

const http = require("http");
const socketConfig = require("./config/socket.js");


const express = require("express");
const morgan = require("morgan");
const env = require("./config/environment.js");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy.js");
const passportJWT = require("./config/passport-jwt-strategy.js");
const passportGoogle = require("./config/passport-google-oauth2-strategy.js");
const MongoStore = require("connect-mongo");
const path = require("path");
const flash = require("connect-flash");
const customMware = require("./config/middleware.js");

const app = express();
const rev = require("./config/revHelper.js");
app.locals.rev = rev;

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, env.asset_path)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);

app.use(session({
    name: "codeial",
    secret: env.session_cookie_key,
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
app.use(morgan(env.morgan.mode, env.morgan.options));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", require("./routes/index.js"));


// Create raw HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketConfig.init(server);

// Handle Socket.io connections
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (msg) => {
        console.log("Message received:", msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

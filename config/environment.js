const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
if(!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: logDirectory
});

const development = {
    name: "development",
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: "codeial_development?retryWrites=true&w=majority&appName=codeialCluster",
    smtp: {
        service: "gmail",
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET_KEY,
    morgan: {
        mode: "dev",
        options: { stream: accessLogStream }
    }
}

const production = {
    name: "production",
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: "gmail",
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET_KEY,
    morgan: {
        mode: "combined",
        options: { stream: accessLogStream }
    }
}
console.log("Running in:", process.env.CODEIAL_ENVIRONMENT);

module.exports = process.env.CODEIAL_ENVIRONMENT === "production" ? production : development;

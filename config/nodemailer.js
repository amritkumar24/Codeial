const nodemailer = require("nodemailer");
const env = require("./environment.js");

let transporter = nodemailer.createTransport(env.smtp);

module.exports = transporter;
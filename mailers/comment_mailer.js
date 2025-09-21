const transporter = require("../config/nodemailer");
const ejs = require("ejs");
const path = require("path");

module.exports.newComment = (comment) => {

    const templatePath = path.join(__dirname, "..", "views", "mailers", "new_comment.ejs");
    
    ejs.renderFile(templatePath, comment, (err, html) => {
        if (err) {
            console.log("Error in rendering ejs template:", err);
            return;
        }

        let mailOptions = {
            from: process.env.GMAIL_APP_USER,
            to: comment.userEmail,
            subject: "New Comment Published!",
            html: html
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
            console.log("Error in sending mail:", err);
            return;
            }
            console.log("Message sent:", info.response);
        });
    });

};


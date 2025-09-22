require("dotenv").config();

const commentMailer = require("../mailers/comment_mailer");
const queue = require("../config/kue");

queue.process("emails", function(job, done){
    console.log("Emails worker is processing a job", job.data);

    commentMailer.newComment(job.data);

    done();
});
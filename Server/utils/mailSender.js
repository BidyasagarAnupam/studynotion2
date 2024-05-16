const nodemailer = require('nodemailer');
require("dotenv").config()

const mailSender = async (email, title, body) => { 
    try {
        console.log("MailSender pe aaraha hai");
        let transpoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transpoter.sendMail({
            from: 'StudyNotion || AB Tech - by Bidya',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        console.log(info);
        return info;
    } catch (error) {
        console.log("Error occured in the setup of mailSender");
        console.log(error.message);
    }
};

module.exports = mailSender;
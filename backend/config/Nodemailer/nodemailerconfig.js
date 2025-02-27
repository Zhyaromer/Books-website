const nodemailer = require('nodemailer');
const templates = require('../templates/emailTemplates'); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    logger: true, 
    debug: true  
});


const send = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        let info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};

const sendEmail = {};
Object.keys(templates).forEach((key) => {
    sendEmail[key] = (to, params) => {
        const { subject, html } = templates[key](params);
        return send(to, subject, html);
    };
});

module.exports = sendEmail;

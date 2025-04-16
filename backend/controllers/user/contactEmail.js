const xss = require('xss');
const validateEmail = require('../../utils/checkEmailFormat');
const { transporter } = require('../../config/Nodemailer/nodemailerconfig');

const contactEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    const sanitizedName = xss(name);
    const sanitizedEmail = xss(email);
    const sanitizedSubject = xss(subject);
    const sanitizedMessage = xss(message);

    if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) { 
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(sanitizedEmail)) {
        return res.status(400).json({ message: "ئیمەیڵەکەت دروست نیە" });
    }
   
    try {
        const mailOptions = {
            from: sanitizedEmail,
            to: process.env.EMAIL_USER,
            subject: sanitizedSubject,
            text: `
                Name: ${sanitizedName}
                Email: ${sanitizedEmail}
                Subject: ${sanitizedSubject}
                Message:
                ${sanitizedMessage}
            `,
        };

        let info = await transporter.sendMail(mailOptions);

        if (!info) {
            return res.status(500).json({ message: "Failed to send email" });
        }
        return res.status(200).json({ message: "Email sent successfully" });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = contactEmail;
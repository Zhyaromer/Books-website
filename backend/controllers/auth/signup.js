const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const bcrypt = require('bcrypt');
const validateEmail = require('../../utils/checkEmailFormat');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const signup = async (req, res) => {
    const { username, name, email, password, conformPassword } = req.body;
    console.log(req.body);

    const sanUsername = xss(username);
    const sanName = xss(name);
    const sanEmail = xss(email);
    const sanPassword = xss(password);
    const sanConformPassword = xss(conformPassword);

    if (!sanUsername || !sanName || !sanEmail || !sanPassword) {

        return res.status(400).json({ error: "All fields are required" });
    }

    if (sanPassword !== sanConformPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one uppercase letter, one number, and one special character and at least 8 characters" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanPassword, salt);
       
        const isUserExist = `SELECT email, username, id FROM users WHERE email = ? OR username = ?`;
        db.query(isUserExist, [sanEmail, sanUsername], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }

            if (result.length > 0) {
                if (result[0].email === sanEmail) {
                    return res.status(400).json({ error: "Email already exists, please choose another one" });
                } else if (result[0].username === sanUsername) {
                    return res.status(400).json({ error: "Username already exists, please choose another one" });
                }
            }

            const createUser = `INSERT INTO users (username, name, email, password_hash) VALUES (?, ?, ?, ?)`;
            db.query(createUser, [sanUsername, sanName, sanEmail, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Internal server error" });
                }

                sendEmail.signup(sanEmail, { name: 'John Doe' }).then(() => {
                    console.log('Email sent successfully');
                }).catch((error) => {
                    console.error('Error sending email:', error);
                });

                return res.status(201).json({ message: "User created successfully" });
            });
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = signup;

const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const bcrypt = require('bcrypt');
const validateEmail = require('../../utils/checkEmailFormat');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const signup = async (req, res) => {
    const { username, name, email, password, conformPassword } = req.body;

    const sanUsername = xss(username);
    const sanName = xss(name);
    const sanEmail = xss(email);
    const sanPassword = xss(password);
    const sanConformPassword = xss(conformPassword);

    if (!sanUsername || !sanName || !sanEmail || !sanPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (sanPassword !== sanConformPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    if (sanName.length < 1 || sanName.length > 35) {
        return res.status(400).json({ message: "Name must be between 1 and 35 characters" });
    }

    if (sanUsername.length < 1 || sanUsername.length > 35) {
        return res.status(400).json({ message: "Username must be between 1 and 35 characters" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter, one number, and one special character and at least 8 characters" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanPassword, salt);

        const isUserExist = `SELECT email, username, id FROM users WHERE email = ? OR username = ?`;
        db.query(isUserExist, [sanEmail, sanUsername], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length > 0) {
                if (result[0].email === sanEmail) {
                    return res.status(400).json({ message: "Email already exists, please choose another one" });
                } else if (result[0].username === sanUsername) {
                    return res.status(400).json({ message: "Username already exists, please choose another one" });
                }
            }

            const createUser = `INSERT INTO users (username, name, email, password_hash) VALUES (?, ?, ?, ?)`;
            db.query(createUser, [sanUsername, sanName, sanEmail, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server error" });
                }

                sendEmail.signup(sanEmail, { name });

                return res.status(201).json({ message: "User created successfully" });
            });
        });

    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = signup;
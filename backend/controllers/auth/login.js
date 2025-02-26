const passport = require("../../config/Passport/passport.js");
const xss = require("xss");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
    req.body.email = xss(req.body.email);
    req.body.password = xss(req.body.password);

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!user) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Login successful",
            token,
            userId: user.id
        });
    })(req, res, next);
};

module.exports = login;

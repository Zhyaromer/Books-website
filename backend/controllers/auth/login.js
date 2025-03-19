const passport = require("../../config/Passport/passport.js");
const xss = require("xss");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
    req.body.email = xss(req.body.email);
    req.body.password = xss(req.body.password);

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (!user) {
            return res.status(401).json({ message: "Unauthorized", info });
        }

        const token = jwt.sign({ id: user.id , role: user.role }, process.env.ACCESS_TOKEN, { expiresIn: "10m" });
        const refreshToken = jwt.sign({ id: user.id , role: user.role }, process.env.REFRESH_TOKEN, { expiresIn: "7d" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            userId: user.id
        });
    })(req, res, next);
};

module.exports = login;

const passport = require("../../config/Passport/passport.js"); 
const xss = require("xss");

const login = (req, res, next) => { 
    req.body.email = xss(req.body.email);
    req.body.password = xss(req.body.password);
    console.log(req.body.email, req.body.password);
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            if (!user) {
               console.log("Invalid credentials" );
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                return res.status(200).json({ message: "Login successful", userId: user.id });
            });
        })(req, res, next);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = login;

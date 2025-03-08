const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshtoken = (req, res) => {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized - Login required" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden - Invalid token" });
        }

        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN, { expiresIn: "10s" });

        res.status(200).json({ accessToken });
    });
};

module.exports = refreshtoken;

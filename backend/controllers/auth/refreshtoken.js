const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshtoken = async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized - Login required" });
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden - Invalid token" });
            }

            const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
            return res.status(200).json({ accessToken });
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = refreshtoken;
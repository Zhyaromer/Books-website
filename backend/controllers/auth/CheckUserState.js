const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAuth = (req, res) => {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized - Login required" });
    }

    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!refreshToken || !accessToken) {
        return res.status(400).json({ isAuthenticated: false });
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        const decodedAccessToken = jwt.decode(accessToken);
        return res.status(200).json({
            isAuthenticated: true,
            userId: decodedAccessToken?.id || null,
            role: decodedAccessToken?.role || null
        });
    } catch {
        return res.status(400).json({ isAuthenticated: false });
    }
};

module.exports = verifyAuth;
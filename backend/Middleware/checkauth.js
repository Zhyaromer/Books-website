const checkauth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - Login required" });
    }
    next();
};

module.exports = checkauth;

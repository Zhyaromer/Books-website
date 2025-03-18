const checkRole = (req, res, next) => {
    if ((req?.user?.role !== "admin")) {
        return res.status(403).json({ message: "Forbidden - Access denied" });
    }
    next();
}

module.exports = checkRole
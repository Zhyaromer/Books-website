const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        req.session.destroy((sessionErr) => {
            if (sessionErr) {
                return res.status(500).json({ message: "Error clearing session" });
            }

            res.clearCookie("connect.sid");
            return res.status(200).json({ message: "Logout successful" });
        });
    });
};

module.exports = logout;
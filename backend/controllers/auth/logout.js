const logout = async (req, res) => {
    const refresh = req?.cookies?.refreshToken;

    if (!refresh) {
        return res.status(200).json({ message: "Unauthorized - Login required", success: false });
    }

    res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: "lax" });
    return res.status(200).json({ message: "Logout successful", success: true });
}

module.exports = logout
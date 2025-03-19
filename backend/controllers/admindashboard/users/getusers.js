const db = require('../../../config/SQL/sqlconfig');

const getusers = async (req, res) => {
    try {
        const [users] = await db.promise().query('SELECT id, username, name, email, role, created_at , coverImgURL ,bio FROM users');

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json(users);
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getusers;
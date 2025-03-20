const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../../config/SQL/sqlconfig');

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
                if (err) {
                    return done(err,false , { message: 'Internal Server Error' });
                }
                if (!user[0]) {
                    return done(null, false, { message: 'incorrect credentials' });
                }
                const isMatch = await bcrypt.compare(password, user[0].password_hash);
                if (!isMatch) {
                    return done(null, false, { message: 'incorrect credentials' });
                }
                return done(null, user[0]);
            })
        } catch (error) {
            return done(error, false , { message: 'Internal Server Error' });
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query('SELECT id,username,email,coverImgURL,role,name,bio FROM users WHERE id = ?', [id], (err, user) => {
        done(err, user[0]);
    });
});

module.exports = passport;
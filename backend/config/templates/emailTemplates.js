module.exports = {
    signup: ({ name }) => ({
        subject: 'Welcome to Our Service!',
        html: `<h1>Hello, ${name}!</h1><p>Thank you for signing up. We're happy to have you.</p>`
    }),

    passwordReset: ({ name, resetLink }) => ({
        subject: 'Password Reset Request',
        html: `<h1>Hi ${name},</h1><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    }),
    
    changeName : ({ name }) => ({
        subject: 'Name Change Notification',
        html: `<h1>Hello,your name has been changed to ${name}</h1><p></p>`
    }),

    changeusername: ({ username }) => ({
        subject: 'Username Change Notification',
        html: `<h1>Hello,your username has been changed to ${username}</h1><p></p>`
    }),

    changeemail: ({ name,email }) => ({
        subject: 'Email Change Notification',
        html: `<h1>Hello ${name},your email has been changed to ${email}</h1><p></p>`
    }),

    changePassword: ({ name }) => ({
        subject: 'Password Change Notification',
        html: `<h1>Hello ${name},your password has been changed</h1><p></p>`
    }),

    accountdeletion : ({ name }) => ({
        subject: 'Account Deletion Notification',
        html: `<h1>Hello ${name},your account has been deleted</h1><p></p>`
    })
};

const bcrypt = require('bcryptjs')
const User = require('@/models/user')

const signup = async ({ email, password }) => {
    console.log('signup', email, password)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        delete user.dataValues.password;

        return user;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Email already exists');
        }

        throw error;
    }
};

module.exports = {
    signup
};

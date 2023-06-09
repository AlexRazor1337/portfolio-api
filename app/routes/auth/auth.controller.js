const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('@/models/user')
const InvalidatedToken = require('@/models/invalidated-token')

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

const login = async ({ email, password }) => {
    const user = await User.findOne({
        where: {
            email,
        },
        raw: true,
    });

    if (!user) return new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return new Error('Invalid credentials');

    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    return {
        ...user,
        token,
    };
};

const logout = (token) => {
    return InvalidatedToken.create({
        token,
    });
};


module.exports = {
    signup,
    login,
    logout,
};

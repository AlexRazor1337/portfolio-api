const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('@/models/user')
const InvalidatedToken = require('@/models/invalidated-token')
const { BadRequestException, UnauthorizedException } = require('@/exceptions')

const signup = async ({ email, password }) => {
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
            throw new BadRequestException('Email already exists');
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

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

    return {
        ...user,
        token,
    };
};

const logout = (token) => {
    return InvalidatedToken.create({
        token,
    }).then(() => { return { message: 'Logged out' } });
};


module.exports = {
    signup,
    login,
    logout,
};

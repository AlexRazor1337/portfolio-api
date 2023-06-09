const User = require('@/models/user');
const InvalidatedToken = require('@/models/invalidated-token');

const getProfile = ({ id }) => {
    return User.findOne({
        where: {
            id,
        },
    }).then((result) => {
        if (!result) throw new Error('User not found');

        delete result.dataValues.password;
        return result;
    })
};

const deleteProfile = ({ id, token }) => {
    return Promise.all([
        User.destroy({
            where: {
                id,
            },
        }),
        InvalidatedToken.create({
            token,
        }),
    ]).then((result) => {
        if (result[0] === 1) return { message: 'Profile deleted' };
        else throw new Error('User not found');
    });
}

module.exports = {
    getProfile,
    deleteProfile,
};

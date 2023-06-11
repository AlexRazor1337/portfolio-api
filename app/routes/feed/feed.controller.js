const User = require('@/models/user');
const Image = require('@/models/image');
const Comment = require('@/models/comment');
const Portfolio = require('@/models/portfolio');

const getFeed = async ({ offset = 0, limit = 10 }) => {
    return await Image.findAll({
        include: [
            {
                model: Portfolio,
                attributes: ['name'],
            },
            {
                model: Comment,
                attributes: { exclude: ['imageId', 'userId'] },
                include: {
                    model: User,
                    attributes: ['id', 'email'],
                },
            }
        ],
        attributes: {
            exclude: ['portfolioId'],
        },
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    }).then(images => images.map(image => { return { ...image.get(), url: `/images/${image.filename}` }}));
}

module.exports = {
    getFeed,
};

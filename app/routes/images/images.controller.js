const crypto = require('crypto');
const fs = require('fs').promises;
const mime = require('mime-types');

const Image = require('@/models/image');
const Portfolio = require('@/models/portfolio');
const Comment = require('@/models/comment');
const User = require('@/models/user');

const uploadImage = async ({ id: userId, portfolioId, name, description, file }) => {
    const filename = `${crypto.randomUUID()}.${mime.extension(file.mimetype)}`;
    let image;
    try {
        image = await Image.create({
            portfolioId,
            name,
            description,
            filename,
        });
    } catch {
        throw new Error('Error uploading image!');
    }

    try {
        await fs.writeFile(`./images/${filename}`, file.buffer);
    } catch {
        await image.destroy();

        throw new Error('Error uploading image!');
    }

    return image;
};

const getImage = async ({ id }) => {
    const image = await Image.findOne({
        where: {
            id,
        },
        include: [{
            model: Portfolio,
            attributes: ['id', 'name'],
        },
        {
            model: Comment,
            attributes: { exclude: ['userId', 'imageId'] },
            include: {
                model: User,
                attributes: ['id', 'email'],
            },
        }],
    });

    if (!image) throw new Error('Image not found!');

    return { ...image.get(), url: `/images/${image.filename}` };
};

const deleteImage = async ({ id: userId, imageId }) => {
    const image = await Image.findOne({
        where: {
            id: imageId,
            '$Portfolio.userId$': userId,
        },
        include: Portfolio,
    });

    if (!image) throw new Error('Image not found!');
    await image.destroy();

    return { message: 'Image deleted!' };
};

module.exports = {
    uploadImage,
    getImage,
    deleteImage,
};

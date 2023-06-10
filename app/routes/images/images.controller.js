const Image = require('@/models/image');
const Portfolio = require('@/models/portfolio');

const crypto = require('crypto');
const fs = require('fs').promises;
const mime = require('mime-types');

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

const getImage = async ({ id: userId, imageId }) => {
    const image = await Image.findOne({
        where: {
            id: imageId,
        },
        include: Portfolio,
    });

    if (!image || image.Portfolio.userId !== userId) throw new Error('Image not found!');

    return image;
};

const deleteImage = async ({ id: userId, imageId }) => {
    const image = await Image.findOne({
        where: {
            id: imageId,
        },
        include: Portfolio,
    });

    if (!image || image.Portfolio.userId !== userId) throw new Error('Image not found!');
    await image.destroy();

    return { message: 'Image deleted!' };
};

module.exports = {
    uploadImage,
    getImage,
    deleteImage,
};

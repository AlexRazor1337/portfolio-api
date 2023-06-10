const Image = require('@/models/image');
const crypto = require('crypto');
const fs = require('fs').promises;
const mime = require('mime-types');

const uploadImage = async ({ id: userId, portfolioId, name, description, file }) => {
    const filename = `${crypto.randomUUID()}.${mime.extension(file.mimetype)}`;
    const image = await Image.create({
        portfolioId,
        name,
        description,
        filename,
    });

    try {
        await fs.writeFile(`./images/${filename}`, file.buffer);
    } catch {
        await image.destroy();

        throw new Error('Error uploading image!');
    }

    return { ...image, savedFile };
};
const getImage = async ({ id: userId, portfolioId, imageId }) => {
};
const deleteImage = async ({ id: userId, portfolioId, imageId }) => {
};

module.exports = {
    uploadImage,
    getImage,
    deleteImage,
};

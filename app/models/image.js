const fs = require('fs');
const path = require('path');
const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class Image extends Model {}

Image.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    filename: DataTypes.STRING,
}, {
    sequelize,
});

Image.beforeDestroy(async (image, options) => { // Destroy images when Image instance is destroyed, called with portfolio delete
    const filePath = path.join('images', image.filename);
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error(`Error deleting the file: ${image.filename}`, error);
    }
});

module.exports = Image;

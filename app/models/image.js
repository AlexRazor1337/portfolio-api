const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

const Portfolio = require('./portfolio');

class Image extends Model {}

Image.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    filehash: DataTypes.STRING,
}, {
    sequelize,
});

Image.belongsTo(Portfolio, { foreignKey: 'portfolioId' });
Portfolio.hasMany(Image, { foreignKey: 'portfolioId' });

module.exports = Image;

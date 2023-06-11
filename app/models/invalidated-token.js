const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class InvalidatedToken extends Model {}

InvalidatedToken.init({
    token: DataTypes.STRING,
}, {
    sequelize,
    updatedAt: false,
});

module.exports = InvalidatedToken;

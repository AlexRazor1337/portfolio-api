const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

const User = require('./user');

class Portfolio extends Model {}

Portfolio.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
}, {
    sequelize,
});

Portfolio.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Portfolio, { foreignKey: 'userId' });

module.exports = Portfolio;

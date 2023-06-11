const { DataTypes, Model } = require('sequelize');

const User = require('./user');
const Image = require('./image');
const sequelize = require('../db');

class Portfolio extends Model {}

Portfolio.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
}, {
    sequelize,
});

Portfolio.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Portfolio, { foreignKey: 'userId' });

Image.belongsTo(Portfolio, { foreignKey: 'portfolioId' });
Portfolio.hasMany(Image, { foreignKey: 'portfolioId' });

Portfolio.beforeDestroy(async (portfolio, options) => {
    await Image.destroy({
        where: {
            portfolioId: portfolio.id,
        },
        individualHooks: true,
    });
});

module.exports = Portfolio;

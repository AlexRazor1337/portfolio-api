const InvalidatedToken = require('@/models/invalidated-token');
const { Op } = require('sequelize');

const WEEK = 1000 * 60 * 60 * 24 * 7;

const clearInvalidatedTokens = async () => {
    await InvalidatedToken.destroy({ where: { createdAt: { [Op.lt]: Date.now() + WEEK } } });
};

module.exports = clearInvalidatedTokens;

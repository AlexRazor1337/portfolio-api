const Portfolio = require('@/models/portfolio');

const getPortfolios = ({ id: userId }) => {
    return Portfolio.findAll({
        where: {
            userId,
        },
    });
};

const createPortfolio = ({ id: userId, name, description }) => {
    return Portfolio.create({
        userId,
        name,
        description,
    });
};

const deletePortfolio = ({ id: userId, portfolioId }) => {
    return Portfolio.destroy({
        where: {
            id: portfolioId,
            userId,
        },
    }).then((result) => {
        if (result === 1) return { message: 'Portfolio deleted' };
        else throw new Error('Portfolio not found');
    });
};

const getPortfolio = ({ id: userId, portfolioId }) => {
    return Portfolio.findOne({
        where: {
            id: portfolioId,
            userId,
        },
    }).then((result) => {
        if (!result) throw new Error('Portfolio not found');
        return result;
    });
};

module.exports = {
    getPortfolios,
    createPortfolio,
    getPortfolio,
    deletePortfolio,
};

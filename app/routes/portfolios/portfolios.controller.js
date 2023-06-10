const Portfolio = require('@/models/portfolio');
const Image = require('@/models/image');

const getPortfolios = ({ id: userId }) => {
    return Portfolio.findAll({
        where: {
            userId,
        },
        include: Image,
    });
};

const createPortfolio = ({ id: userId, name, description }) => {
    return Portfolio.create({
        userId,
        name,
        description,
    });
};

const deletePortfolio = async ({ id: userId, portfolioId }) => {
    const isDeleted = await Portfolio.destroy({
        where: {
            id: portfolioId,
            userId,
        },
        individualHooks: true,
    });

    console.log(isDeleted);

    if (!isDeleted) throw new Error('Portfolio not found');
    return { message: 'Portfolio deleted' };
};

const getPortfolio = async ({ id: userId, portfolioId }) => {
    const portfolio = await Portfolio.findOne({
        where: {
            id: portfolioId,
            userId,
        },
        include: Image,
    });

    if (!portfolio) throw new Error('Portfolio not found');
    return portfolio;
};

module.exports = {
    getPortfolios,
    createPortfolio,
    getPortfolio,
    deletePortfolio,
};
